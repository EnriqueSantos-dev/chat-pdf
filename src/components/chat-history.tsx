import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { MessageCircleMoreIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChatHistoryLink } from "./chat-history-link";

export async function ChatHistory() {
  const { userId } = auth();
  const history = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId!));

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
