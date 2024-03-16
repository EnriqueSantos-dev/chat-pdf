"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function LogoutButton() {
  const logout = async () => {
    signOut();
  };

  return (
    <DropdownMenuItem onSelect={logout}>
      Sair <LogOut className="size-4 ml-auto" />
    </DropdownMenuItem>
  );
}
