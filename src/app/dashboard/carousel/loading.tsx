import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <Skeleton
      className="h-auto w-full container shadow rounded-lg"
      style={{ aspectRatio: 27 / 9 }}
    />
  );
}

export default Loading;
