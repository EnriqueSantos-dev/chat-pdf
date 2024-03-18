"use client";

import Image from "next/image";

import { Github } from "lucide-react";
import { LiteralUnion, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "@auth/core/providers";
import { useToast } from "@/components/ui/use-toast";

export default function SignInButtons() {
  const { toast } = useToast();

  const signInWithProvider = (provider: LiteralUnion<BuiltInProviderType>) => {
    signIn(provider).then((response) => {
      if (response?.error) {
        toast({
          variant: "destructive",
          title: "Não foi possível fazer login no momento!",
          description: "Tente novamente mais tarde.",
        });
      }
    });
  };

  return (
    <div className="grid min-w-64 gap-3">
      <Button
        type="submit"
        size="lg"
        onClick={() => signInWithProvider("github")}
      >
        <Github className="mr-2 size-4" /> Entrar com GitHub
      </Button>
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        onClick={() => signInWithProvider("google")}
      >
        <Image
          src="/google.svg"
          alt="Logo do google"
          width={20}
          height={20}
          className="mr-2"
        />{" "}
        Entrar com Google
      </Button>
    </div>
  );
}
