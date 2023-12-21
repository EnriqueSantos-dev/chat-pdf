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
    <aside className="grid grid-rows-[auto_1fr] gap-y-6 h-full p-6 w-full">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "border-dashed w-full",
        })}
      >
        <PlusCircleIcon className="w-4 h-4 mr-2 text-current" />
        Novo chat
      </Link>

      <div className="space-y-4 max-h-full overflow-hidden h-full">
        {history.length === 0 ? (
          <span className="text-muted">Você ainda não tem chats!</span>
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
