import { Metadata } from "next";

import SignInButtons from "./_components/sign-in-buttons";

export const metadata: Metadata = {
  title: "Login",
  description: "Logue-se no ChatPDF",
};

export default function SignInPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-center text-2xl font-bold">ChatPDF</h1>
      <SignInButtons />
    </section>
  );
}
