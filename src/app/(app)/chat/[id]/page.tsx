import { redirect } from "next/navigation";

import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";

import { Chat } from "@/components/chat";
import { ChatHistory } from "@/components/chat-history";
import PDFViewer from "@/components/pdf-viewer";

import { db } from "@/lib/db";
import { chats as chatsTable } from "@/lib/db/schema";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const chats = await db.query.chats.findMany({
    with: {
      messages: true,
    },
    where: and(eq(chatsTable.userId, user?.id!), eq(chatsTable.id, params.id)),
  });

  if (chats.length === 0) {
    return redirect("/");
  }

  const { messages, ...chat } = chats[0];

  return (
    <div className="grid h-[calc(100dvh-64px)] grid-cols-[minmax(200px,320px)_1fr_500px]">
      <ChatHistory />
      <PDFViewer pdfURL={chat.fileUrl} />
      <Chat chat={chat} messages={messages} />
    </div>
  );
}