import { redirect } from "next/navigation";

import { Chat } from "@/components/chat";
import PDFViewer from "@/components/pdf-viewer";

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
      <PDFViewer pdfURL={chat.fileUrl} />
      <Chat chat={chat} messages={chat.messages} />
    </>
  );
}
