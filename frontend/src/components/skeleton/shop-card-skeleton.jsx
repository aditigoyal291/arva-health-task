import React from "react";
import { Skeleton } from "../ui/skeleton";

const ShopCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <Skeleton className="h-64 py-6" />
      <div className="space-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default ShopCardSkeleton;
