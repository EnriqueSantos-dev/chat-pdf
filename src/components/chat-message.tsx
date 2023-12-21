import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Message } from "ai";
import Image from "next/image";

type ChatMessageProps = Message;

export function ChatMessage({ id, content, role }: ChatMessageProps) {
  const { user } = useUser();

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
            src={user?.imageUrl!}
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
      <span className="text-foreground block flex-1 text-pretty rounded-md pt-2">
        {content}
      </span>
    </li>
  );
}
