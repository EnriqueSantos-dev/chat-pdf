import { redirect } from "next/navigation";

import { Chat } from "@/components/chat";
import PDFViewer from "@/components/pdf-viewer";
import { ChatHistory } from "@/components/chat-history";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const chat = await prisma.chat.findUnique({
    include: { messages: true },
    where: { id: params.id, userId: session?.user?.id! },
  });

  if (!chat) {
    redirect("/");
  }

  return (
    <>
      <ChatHistory />
      <PDFViewer key={chat.id} pdfURL={chat.fileUrl} />
      <Chat chat={chat} messages={chat.messages} />
    </>
  );
}
