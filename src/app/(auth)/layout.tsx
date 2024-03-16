import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-dvh w-dvw place-content-center">{children}</main>
  );
}
