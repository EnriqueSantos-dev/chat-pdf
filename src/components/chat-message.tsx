import { cn } from "@/lib/utils";
import { Message } from "ai";
import { useSession } from "next-auth/react";
import Image from "next/image";

type ChatMessageProps = Message;

export function ChatMessage({ id, content, role }: ChatMessageProps) {
  const { data } = useSession<true>();
  const user = data?.user;

  return (
    <li
      key={id}
      className={cn("flex gap-3 p-6 border-b", {
        "flex-row-reverse": role === "assistant",
      })}
    >
      <div
        className={cn(
          "relative rounded-full size-11 shrink-0 overflow-hidden",
          {
            "bg-muted flex items-center justify-center": role === "assistant",
          }
        )}
      >
        {role === "user" ? (
          <Image
            src={user?.image!}
            alt={
              role === "user"
                ? "Foto de perfil do usuário"
                : "Foto da logo da OpenAI"
            }
            fill
          />
        ) : (
          <Image
            src="/openai.svg"
            alt="Foto da logo da OpenAI"
            width={28}
            height={28}
          />
        )}
      </div>
      <span className="block flex-1 text-pretty rounded-md pt-2 text-foreground">
        {content}
      </span>
    </li>
  );
}
