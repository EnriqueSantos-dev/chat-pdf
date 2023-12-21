import { ChatHistory } from "@/components/chat-history";
import { FileUpload } from "@/components/file-upload";

export default function Home() {
  return (
    <div className="grid h-[calc(100dvh-64px)] grid-cols-[minmax(200px,320px)_1fr]">
      <ChatHistory />
      <div className="grid h-full place-content-center gap-3">
        <p className="text-muted-foreground text-balance text-xl">
          Selecione uma conversa para começar ou adicione um arquivo
        </p>
        <FileUpload className="mx-auto w-full" />
      </div>
    </div>
  );
}
