"use client";

import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ChatHistoryLinkProps = Chat;

export function ChatHistoryLink({ id, fileName }: ChatHistoryLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === `/chat/${id}`;

  return (
    <Link
      href={`/chat/${id}`}
      className={cn(
        "px-2 py-1.5 transition-colors flex justify-center items-center hover:bg-muted rounded-md",
        {
          "text-purple-500": isActive,
        }
      )}
    >
      <MessageSquare className="mr-2 size-4 shrink-0" />
      <span className="w-full truncate whitespace-nowrap">{fileName}</span>
    </Link>
  );
}
