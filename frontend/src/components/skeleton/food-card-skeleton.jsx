import React from "react";
import { Skeleton } from "../ui/skeleton";

const FoodCardSkeleton = () => {
  return (
    <div className="relative flex gap-x-4 rounded-lg bg-white p-2">
      <div className="flex">
        <Skeleton className="h-40 w-40 rounded-lg" />
      </div>

      <div className="flex min-w-52 flex-1 flex-col gap-y-1">
        <div className="flex justify-between gap-x-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-7" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex h-full items-end justify-between">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
    </div>
  );
};

export default FoodCardSkeleton;
