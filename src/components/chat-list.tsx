import { Message as MessageType } from "ai";
import { ChatMessage } from "./chat-message";

type ChatListProps = {
  messages: MessageType[];
};

export function ChatList({ messages }: ChatListProps) {
  return (
    <ul className="scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-rounded-full scrollbar-track-muted scrollbar-thumb-rounded-full flex-1 space-y-6 overflow-y-auto scroll-smooth px-4 py-6">
      {messages.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </ul>
  );
}
