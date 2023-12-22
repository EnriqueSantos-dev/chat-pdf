import { randomUUID } from "node:crypto";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RedisVectorStore } from "langchain/vectorstores/redis";

import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { uploadToSupabase } from "@/lib/upload-to-supabase";
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  const redisClient = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
  });

  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" });

    await redisClient.connect();

    const formdata = await req.formData();
    const file = formdata.get("file") as File | null;

    if (!file) return NextResponse.json({ message: "File is missing" });

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name, fileExtension);
    const filenameToSave = `${filename}-${randomUUID()}`;

    const publicFileURL = await uploadToSupabase(file, `${filenameToSave}.pdf`);

    if (!publicFileURL) return NextResponse.json({ message: "Upload failed" });

    // generate embeddings for the file with langchain
    const loader = new PDFLoader(file);
    const docs = await loader.loadAndSplit();
    const docsMapped = docs.map((doc) => ({
      ...doc,
      pageContent: doc.pageContent.replace(/\n/g, " "),
    }));

    await RedisVectorStore.fromDocuments(docsMapped, new OpenAIEmbeddings(), {
      redisClient,
      indexName: `chatpdf:${filenameToSave}`,
    });

    const chat = await db
      .insert(chats)
      .values({
        filename: filenameToSave,
        fileUrl: publicFileURL,
        userId,
      })
      .returning();

    return NextResponse.json({ ...chat[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Generate embeddings failed" });
  } finally {
    await redisClient.disconnect();
  }
}
