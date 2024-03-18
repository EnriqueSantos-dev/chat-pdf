import { Skeleton } from "./ui/skeleton";

export default function UserProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="size-11 rounded-full" />
    </div>
  );
}
