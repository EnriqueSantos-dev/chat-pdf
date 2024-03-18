"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

import { uploadFile } from "@/lib/upload-file";

import { useToast } from "./ui/use-toast";

type FileUploadProps = React.ComponentProps<"div">;

export function FileUpload({ className, ...props }: FileUploadProps) {
  const router = useRouter();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: ({ id }) => {
      toast({
        title: "Chat criado com sucesso!",
        description: "Você será redirecionado para o chat em instantes.",
      });
      router.push(`/chat/${id}`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro ao criar o chat!",
        description: "Tente novamente mais tarde.",
      });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Arquivo muito grande!",
          description: "O arquivo deve ter no máximo 10MB.",
        });
        return;
      }

      mutation.mutate(file);
    },
  });

  return (
    <div
      {...props}
      className={cn("p-2 bg-muted rounded-xl max-w-md", className)}
    >
      <div
        {...getRootProps({
          className: cn(
            "border-dashed border-2 border-muted-foreground rounded-xl cursor-pointer py-8 flex justify-center items-center flex-col",
            {
              "pointer-events-none": mutation.isPending,
            }
          ),
        })}
      >
        <input {...getInputProps()} aria-disabled={mutation.isPending} />
        {mutation.isPending ? (
          <>
            <Loader2 className="size-10 animate-spin text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              Criando uma conversa, aguarde...
            </p>
          </>
        ) : (
          <>
            <Inbox className="size-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              Jogue seu arquivo aqui
            </p>
          </>
        )}
      </div>
    </div>
  );
}
