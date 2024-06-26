import React from "react";

import Header from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="grid h-[calc(100dvh-64px)] grid-cols-[minmax(200px,320px)_1fr_500px]">
        {children}
      </main>
    </>
  );
}
