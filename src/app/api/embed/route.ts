import { randomUUID } from "node:crypto";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RedisVectorStore } from "langchain/vectorstores/redis";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getRedisClient } from "@/lib/redis";
import { uploadToSupabase } from "@/lib/upload-to-supabase";

export async function POST(req: NextRequest) {
  const redisClient = await getRedisClient();

  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) return NextResponse.json({ message: "Unauthorized" });

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

    const chat = await prisma.chat.create({
      data: {
        fileName: filenameToSave,
        fileUrl: publicFileURL,
        userId,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Generate embeddings failed" });
  } finally {
    await redisClient.disconnect();
  }
}
