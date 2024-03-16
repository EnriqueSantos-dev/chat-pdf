import { auth } from "@/lib/auth";
import LogoutButton from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function UserProfile() {
  const session = await auth();
  if (!session?.user) return null;

  const avatar = session.user.image;
  const username = session.user.name;

  const firstLetters = username
    ?.split(" ")
    .map((n) => n.substring(0, 1))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <p>{username}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={avatar!} alt={username!} />
            <AvatarFallback className="font-bold">
              {firstLetters}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
