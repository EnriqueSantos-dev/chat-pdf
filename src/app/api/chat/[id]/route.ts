import { db } from "@/lib/db";
import { chatRelations, chats } from "@/lib/db/schema";
import { LangChainStream, StreamingTextResponse } from "ai";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { NextRequest } from "next/server";
import { createClient } from "redis";
import { messages as messagesTable } from "@/lib/db/schema";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const redisClient = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
  });

  await redisClient.connect();

  try {
    const body = await req.json();
    const { filename, messages } = body;
    const indexName = `chatpdf:${filename}`;
    const query = messages.at(-1).content;

    const { stream, handlers } = LangChainStream({
      async onCompletion(completion) {
        await db.insert(messagesTable).values([
          {
            content: query,
            role: "user",
            chatId: params.id,
          },
          {
            content: completion,
            role: "assistant",
            chatId: params.id,
          },
        ]);
        await redisClient.disconnect();
      },
    });

    const redisVectorStore = new RedisVectorStore(new OpenAIEmbeddings(), {
      redisClient,
      indexName,
    });

    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
      presencePenalty: 0,
      frequencyPenalty: 0,
      streaming: true,
    });

    const chain = RetrievalQAChain.fromLLM(
      model,
      redisVectorStore.asRetriever({
        searchType: "similarity",
        k: 5,
      }),
      {
        returnSourceDocuments: true,
      }
    );

    chain.call({ query }, [handlers]);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    await redisClient.disconnect();
    return new Response("Internal Server Error", { status: 500 });
  }
}
