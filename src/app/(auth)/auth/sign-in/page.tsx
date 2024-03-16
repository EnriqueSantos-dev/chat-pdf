import { Metadata } from "next";
import SignInButton from "./_components/sign-in-button";

export const metadata: Metadata = {
  title: "Login",
  description: "Logue-se no ChatPDF",
};

export default function SignInPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl text-center font-bold">ChatPDF</h1>
      <SignInButton />
    </section>
  );
}
