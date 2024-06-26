import { api } from "@/lib/api";
import { Chat } from "@prisma/client";

export async function uploadFile(file: File): Promise<Chat> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/api/embed", formData);
  return response.data;
}
