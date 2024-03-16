import { auth } from "@/lib/auth";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { ChatHistoryLink } from "./chat-history-link";
import { buttonVariants } from "./ui/button";
import prisma from "@/lib/prisma";
import { cache } from "react";

const getChats = cache(async (userId: string) => {
  return await prisma.chat.findMany({
    where: { userId },
  });
});

export async function ChatHistory() {
  const session = await auth();
  const history = await getChats(session?.user?.id!);

  return (
    <aside className="grid h-full w-full grid-rows-[auto_1fr] gap-y-6 border-r p-6">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "border-dashed w-full",
          size: "lg",
        })}
      >
        <PlusCircleIcon className="mr-2 h-4 w-4 text-current" />
        Nova Conversa
      </Link>

      <div className="h-full max-h-full space-y-4 overflow-hidden">
        {history.length === 0 ? (
          <span className="text-muted-foreground mt-6 block text-center">
            Você ainda não tem conversas!
          </span>
        ) : (
          <>
            {history.map((chat) => (
              <ChatHistoryLink key={chat.id} {...chat} />
            ))}
          </>
        )}
      </div>
    </aside>
  );
}
