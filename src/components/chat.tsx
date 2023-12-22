"use client";

import { Chat, Message } from "@/lib/db";
import { useChat } from "ai/react";
import { ChatList } from "./chat-list";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal, StopCircleIcon } from "lucide-react";
import TextAreaResizable from "react-textarea-autosize";
import React from "react";

type ChatProps = {
  chat: Chat;
  messages: Message[];
};

export function Chat({ chat, messages: initialMessages }: ChatProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const { input, messages, stop, isLoading, handleInputChange, handleSubmit } =
    useChat({
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
    <div className="flex h-[inherit] flex-col gap-6">
      <ChatList messages={messages} />
      <form onSubmit={handleSubmit} className="relative px-4 py-6">
        {isLoading && (
          <Button
            type="button"
            size="sm"
            className="mb-2"
            onClick={() => stop()}
          >
            <StopCircleIcon className="mr-2 size-4" /> Parar
          </Button>
        )}

        <div className="flex items-center gap-3">
          <TextAreaResizable
            placeholder="Envie uma mensagem"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                buttonRef.current?.click();
              }
            }}
            className="placeholder:text-muted-foreground focus-visible:ring-ring border-input h-10 max-h-20 flex-1 resize-none rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button ref={buttonRef} type="submit" size="icon" variant="default">
            <SendHorizonal className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
