import { ChatHistory } from "@/components/chat-history";
import { FileUpload } from "@/components/file-upload";

export default function Home() {
  return (
    <div className="grid grid-cols-[minmax(200px,320px)_1fr] h-dvh">
      <ChatHistory />
      <div className="grid place-content-center gap-3 h-full">
        <p className="text-muted-foreground text-balance text-xl">
          Selecione um chat para começar ou crie um novo chat.
        </p>
        <FileUpload className="mx-auto w-full" />
      </div>
    </div>
  );
}
