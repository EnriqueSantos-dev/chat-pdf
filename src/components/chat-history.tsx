import { auth } from "@/lib/auth";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { ChatHistoryLink } from "./chat-history-link";
import { buttonVariants } from "./ui/button";
import prisma from "@/lib/prisma";

export async function ChatHistory() {
  const session = await auth();
  const history = await prisma.chat.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <aside className="grid size-full grid-rows-[auto_1fr] gap-y-6 border-r p-6">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "border-dashed w-full",
          size: "lg",
        })}
      >
        <PlusCircleIcon className="mr-2 size-4 text-current" />
        Nova Conversa
      </Link>

      <div className="h-full max-h-full space-y-4 overflow-hidden">
        {history.length === 0 ? (
          <span className="mt-6 block text-center text-muted-foreground">
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
