'use client'

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-separator";
import { JSX } from "react";

const TweetCardSkeleton = (): JSX.Element => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <div className="flex items-start space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
          <Skeleton className="h-3 w-1/4 mt-1" />
        </div>
        <Skeleton className="h-6 w-6 rounded-sm" />
      </div>
    </CardHeader>
    <CardContent className="pt-0 space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="aspect-video w-full rounded-lg mt-2" />
    </CardContent>
    <Separator className="my-1" />
    <CardFooter className="py-3">
      <div className="flex w-full items-center justify-around">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </CardFooter>
  </Card>
);

export default TweetCardSkeleton;