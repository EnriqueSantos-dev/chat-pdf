"use client";

import { Chat } from "@/lib/db";
import { cn } from "@/lib/utils";
import { MessageCircleMoreIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ChatHistoryLinkProps = Chat;

export function ChatHistoryLink({ id, filename }: ChatHistoryLinkProps) {
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
      <MessageCircleMoreIcon className="w-4 h-4 mr-2 flex-shrink-0" />
      <span className="w-full whitespace-nowrap truncate">{filename}</span>
    </Link>
  );
}
