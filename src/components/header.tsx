import Link from "next/link";
import UserProfile from "./user-profile";
import { Suspense } from "react";
import UserProfileSkeleton from "./user-profile-skeleton";

export default function Header() {
  return (
    <header className="h-16 border-b">
      <nav className="flex size-full items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-2xl font-bold text-transparent "
        >
          ChatPDF
        </Link>
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile />
        </Suspense>
      </nav>
    </header>
  );
}
