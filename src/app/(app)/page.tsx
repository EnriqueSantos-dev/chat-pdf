import { ChatHistory } from "@/components/chat-history";
import { FileUpload } from "@/components/file-upload";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid h-[calc(100dvh-64px)] grid-cols-[minmax(200px,320px)_1fr]">
        <ChatHistory />
        <div className="grid h-full place-content-center gap-3">
          <p className="text-balance text-xl text-muted-foreground">
            Selecione uma conversa para começar ou adicione um arquivo
          </p>
          <FileUpload className="mx-auto w-full" />
        </div>
      </main>
    </>
  );
}
