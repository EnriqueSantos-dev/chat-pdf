"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button type="submit" size="lg" onClick={() => signIn("github")}>
      <Github className="mr-2 size-4" /> Entrar com GitHub
    </Button>
  );
}
