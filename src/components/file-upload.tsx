"use client";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/services/upload-file";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

type FileUploadProps = React.ComponentProps<"div">;

export function FileUpload({ className, ...props }: FileUploadProps) {
  const router = useRouter();
  const { mutate, status } = useMutation({
    mutationFn: uploadFile,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("O arquivo é muito grande! O limite é 10MB");
        return;
      }

      try {
        mutate(file, {
          onSuccess: ({ id }) => {
            toast.success("Chat criado com sucesso!");
            router.push(`/chat/${id}`);
          },
          onError: (err) => {
            toast.error("Ocorreu um erro ao criar o chat!");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      {...props}
      className={cn("p-2 bg-muted rounded-xl max-w-md", className)}
    >
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-muted-foreground rounded-xl cursor-pointer py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {status === "pending" ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              Criando uma conversa, aguarde...
            </p>
          </>
        ) : (
          <>
            <Inbox className="h-10 w-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              Jogue seu arquivo aqui
            </p>
          </>
        )}
      </div>
    </div>
  );
}
