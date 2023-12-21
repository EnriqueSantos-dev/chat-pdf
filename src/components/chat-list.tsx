import { Message as MessageType } from "ai";
import { ChatMessage } from "./chat-message";

type ChatListProps = {
  messages: MessageType[];
};

export function ChatList({ messages }: ChatListProps) {
  return (
    <ul className="py-6 space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-rounded-full scrollbar-track-slate-950 scrollbar-thumb-rounded-full px-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </ul>
  );
}
