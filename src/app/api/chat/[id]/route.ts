import { NextRequest } from "next/server";

import { LangChainStream, StreamingTextResponse } from "ai";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RedisVectorStore } from "langchain/vectorstores/redis";

import prisma from "@/lib/prisma";
import { getRedisClient } from "@/lib/redis";

const INDEX_PREFIX = "chatpdf:";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { filename, messages } = body;
    const indexName = `${INDEX_PREFIX}${filename}`;
    const query = messages.at(-1).content;

    const { stream, handlers } = LangChainStream({
      async onCompletion(completion) {
        await prisma.message.createMany({
          data: [
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
          ],
        });
      },
    });

    await using redisClient = await getRedisClient();

    const redisVectorStore = new RedisVectorStore(new OpenAIEmbeddings(), {
      redisClient: redisClient.instance,
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
    return new Response("Internal Server Error", { status: 500 });
  }
}
