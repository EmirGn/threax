'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import { LogOut } from "lucide-react";

import TweetCardSkeleton from "../components/TweetCardSkeleton";

import grainyIcon from "../../public/avatarIcons/grainy.jpg";

import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  ExternalLink,
  // LogOut,
  PlusCircle,
  // Image as ImageIcon,
  Video as VideoIcon,
} from 'lucide-react';

import type { TweetData, TweetUser } from '../types/tweet';
import Image from "next/image";
import { toast } from "sonner";

// Mock function to simulate fetching tweet data (remains client-side for this example)
// In a real App Router app, you might fetch this in a Server Component parent
// or via a Route Handler.
const fetchLatestTweet = async (): Promise<TweetData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1234567890',
        user: {
          name: 'Jane Doe (App Router)',
          username: 'janedoe_app',
          avatarUrl: grainyIcon.src,
          profileUrl: 'https://twitter.com/janedoe_app',
        },
        text: "Exploring the new Next.js App Router for our Thread Weaver dashboard! It's looking slick. #NextJS #AppRouter #WebDev ✨",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        media: [
          { type: 'image', url: 'https://picsum.photos/seed/approuter/600/400', altText: 'App Router dashboard concept' }
        ],
        engagement: {
          replies: 22,
          retweets: 95,
          likes: 310,
          views: 18500,
        },
        sourceUrl: 'https://twitter.com/janedoe_app/status/1234567890',
      });
    }, 1500);
  });
};

const UserNav = ({ user, onLogout }: { user?: TweetUser, onLogout: () => void }) => {
  if (!user) {
    return <Skeleton className="h-10 w-24" />;
  }
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
        <AvatarFallback>{user.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm">
        <span className="font-semibold">{user.name}</span>
        <span className="text-xs text-muted-foreground">@{user.username}</span>
      </div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onLogout} className="ml-auto">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

// EngagementMetric Component (can be in its own file or here)
const EngagementMetric = ({ icon, value, label }: { icon: JSX.Element, value: number, label: string }) => {
  const formatEngagementNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    return num.toString();
  };

  return (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1.5 px-2 py-1 h-auto hover:bg-muted/50 rounded-md">
                {icon}
                <span>{formatEngagementNumber(value)}</span>
              </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
};

export default function DashboardPage(): JSX.Element {
  const [latestTweet, setLatestTweet] = useState<TweetData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard - Thread Weaver";

    const loadTweet = async () => {
      setIsLoading(true);
      try {
        const tweet = await fetchLatestTweet();
        setLatestTweet(tweet);
      } catch (error) {
        console.error("Failed to fetch tweet:", error);
        toast("Failed to fetch tweet.")
        // TODO: Handle error state in UI (e.g., show a toast)
      } finally {
        setIsLoading(false);
      }
    };
    loadTweet();
  }, []);

  const handleCreateThread = () => {
    console.log("Navigate to Thread Creation Page");
    router.push('/threads/create'); // App Router navigation
  };

  const handleLogout = () => {
    console.log("User logged out");
    // TODO: Implement actual logout logic (e.g., clear session, call API)
    router.push('/login'); // App Router navigation
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">Threax</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button onClick={handleCreateThread} disabled={isLoading}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Thread
          </Button>
          {/* Pass user from latestTweet for demo, ideally from auth context */}
          <UserNav user={latestTweet?.user} onLogout={handleLogout} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Your Latest Tweet</h2>
          <p className="text-sm text-muted-foreground">
            Review your most recent activity before creating a new thread.
          </p>
        </div>

        {isLoading ? (
          <TweetCardSkeleton />
        ) : latestTweet ? (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12 border">
                  {latestTweet.user.avatarUrl && <AvatarImage src={latestTweet.user.avatarUrl} alt={latestTweet.user.name} />}
                  <AvatarFallback>{latestTweet.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg hover:underline">
                          <a href={latestTweet.user.profileUrl} target="_blank" rel="noopener noreferrer">
                              {latestTweet.user.name}
                          </a>
                      </CardTitle>
                      <CardDescription>@{latestTweet.user.username}</CardDescription>
                    </div>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={latestTweet.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">View on Twitter</span>
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View on Twitter</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(latestTweet.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-base whitespace-pre-wrap break-words">
                {latestTweet.text}
              </p>
              {latestTweet.media && latestTweet.media.length > 0 && (
                <div className="mt-3">
                  {latestTweet.media.map((mediaItem, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border">
                      {mediaItem.type === 'image' ? (
                        <Image src={mediaItem.url} alt={mediaItem.altText || 'Tweet media'} width={600} height={400} className="aspect-video w-full object-cover" />
                      ) : mediaItem.type === 'video' ? (
                         <div className="aspect-video w-full bg-slate-800 flex items-center justify-center">
                           <VideoIcon className="h-12 w-12 text-slate-500" />
                         </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <Separator className="my-1" />
            <CardFooter className="py-3">
              <div className="flex w-full items-center justify-around text-xs text-muted-foreground">
                {/* TooltipProvider moved inside EngagementMetric for individual control if needed */}
                <EngagementMetric
                    icon={<MessageCircle className="h-4 w-4" />}
                    value={latestTweet.engagement.replies}
                    label="Replies"
                />
                <EngagementMetric
                    icon={<Repeat2 className="h-4 w-4" />}
                    value={latestTweet.engagement.retweets}
                    label="Retweets"
                />
                <EngagementMetric
                    icon={<Heart className="h-4 w-4" />}
                    value={latestTweet.engagement.likes}
                    label="Likes"
                />
                {latestTweet.engagement.views !== undefined && (
                    <EngagementMetric
                    icon={<BarChart2 className="h-4 w-4" />}
                    value={latestTweet.engagement.views}
                    label="Views"
                    />
                )}
              </div>
            </CardFooter>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground">No tweet data found or failed to load.</p>
        )}
      </main>
    </div>
  );
}