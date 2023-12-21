"use client";

import { Chat, Message } from "@/lib/db";
import { useChat } from "ai/react";
import { ChatList } from "./chat-list";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

type ChatProps = {
  chat: Chat;
  messages: Message[];
};

export function Chat({ chat, messages: initialMessages }: ChatProps) {
  const { input, messages, handleInputChange, handleSubmit } = useChat({
    id: chat.id,
    api: `/api/chat/${chat.id}`,
    body: {
      filename: chat.filename,
    },
    initialMessages: initialMessages.map((message) => ({
      role: message.role,
      id: message.id,
      content: message.content,
    })),
  });

  return (
    <div className="flex flex-col gap-6 max-h-dvh">
      <ChatList messages={messages} />
      <form onSubmit={handleSubmit} className="px-4  py-6">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Envie uma mensagem"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon" variant="secondary">
            <SendHorizonal className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
