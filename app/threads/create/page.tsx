// app/threads/create/page.tsx
'use client';

import { useState, ChangeEvent, useEffect, JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Input } from '@/components/ui/input'; // For tweet character count or other settings later

import { Wand2, Send, Loader2, AlertCircle, Trash2, PlusSquare, ArrowLeft } from 'lucide-react';

import type { GeneratedTweet } from '../../types/tweet';

// Mock AI function to simulate thread generation
const generateThreadFromAI = async (idea: string): Promise<GeneratedTweet[]> => {
  console.log("AI processing idea:", idea);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple splitting logic for mock - a real AI would be more sophisticated
      const paragraphs = idea.split(/\n\s*\n/).filter(p => p.trim() !== ""); // Split by double newlines
      let currentTweet = "";
      const tweets: string[] = [];
      const MAX_LENGTH = 280; // Twitter char limit (simplified)

      if (paragraphs.length === 0 && idea.trim().length > 0) {
        paragraphs.push(idea.trim()); // Handle single block of text
      }

      for (const paragraph of paragraphs) {
        const words = paragraph.split(/\s+/);
        for (const word of words) {
          if ((currentTweet + " " + word).length > MAX_LENGTH) {
            if (currentTweet) tweets.push(currentTweet.trim());
            currentTweet = word;
          } else {
            currentTweet = currentTweet ? currentTweet + " " + word : word;
          }
        }
        if (currentTweet) { // Add any remaining part of the paragraph
             tweets.push(currentTweet.trim());
             currentTweet = "";
        }
      }
      if (currentTweet) tweets.push(currentTweet.trim()); // Add last tweet if any


      // If still no tweets generated and idea has content, make it a single tweet
      if (tweets.length === 0 && idea.trim().length > 0) {
        tweets.push(idea.trim().substring(0, MAX_LENGTH));
      }

      resolve(
        tweets.map((content, index) => ({
          id: `tweet-${Date.now()}-${index}`,
          content: content,
          order: index + 1,
        }))
      );
    }, 2000); // Simulate AI processing time
  });
};

export default function CreateThreadPage(): JSX.Element {
  const router = useRouter();
  const [idea, setIdea] = useState<string>('');
  const [generatedThread, setGeneratedThread] = useState<GeneratedTweet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Create New Thread - Thread Weaver";
  }, []);

  const handleIdeaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setIdea(e.target.value);
    setError(null); // Clear error when user types
    setPublishSuccess(null); // Clear success message
  };

  const handleGenerateThread = async (): Promise<void> => {
    if (!idea.trim()) {
      setError("Please enter your idea for the thread.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPublishSuccess(null);
    setGeneratedThread([]); // Clear previous thread

    try {
      const thread = await generateThreadFromAI(idea);
      if (thread.length === 0) {
        setError("The AI couldn't generate a thread from your idea. Please try rephrasing or adding more detail.");
      }
      setGeneratedThread(thread);
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError("An error occurred while generating the thread. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTweetContentChange = (id: string, newContent: string): void => {
    setGeneratedThread((prevThread) =>
      prevThread.map((tweet) =>
        tweet.id === id ? { ...tweet, content: newContent } : tweet
      )
    );
    setPublishSuccess(null); // Clear success message if user edits
  };

  const handleAddTweet = (index?: number): void => {
    const newTweet: GeneratedTweet = {
      id: `manual-tweet-${Date.now()}`,
      content: "",
      order: generatedThread.length + 1
    };
    if (index !== undefined) {
      const newThread = [...generatedThread];
      newThread.splice(index + 1, 0, newTweet);
      setGeneratedThread(newThread.map((t, i) => ({ ...t, order: i + 1 })));
    } else {
      setGeneratedThread(prev => [...prev, { ...newTweet, order: prev.length + 1}]);
    }
  };

  const handleRemoveTweet = (id: string): void => {
    setGeneratedThread(prevThread => prevThread.filter(tweet => tweet.id !== id).map((t, i) => ({ ...t, order: i + 1 })));
  };

  const handlePublishThread = async (): Promise<void> => {
    if (generatedThread.length === 0) {
      setError("There's nothing to publish. Generate a thread first.");
      return;
    }
    setIsPublishing(true);
    setError(null);
    setPublishSuccess(null);

    // TODO: Implement actual publishing logic (e.g., call Twitter API via backend)
    console.log("Publishing thread:", generatedThread);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    setIsPublishing(false);
    setPublishSuccess("Thread successfully published (simulated)!");
    // Optionally, clear the form or navigate away
    // setIdea('');
    // setGeneratedThread([]);
    // router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {/* Simple Header for Create Page */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Button variant="outline" size="icon" onClick={() => router.back()} aria-label="Go back">
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">Create New Thread</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6">
            <div className="mx-auto grid max-w-3xl gap-6">
                {/* Input Idea Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Thread Idea</CardTitle>
                        <CardDescription>
                            Write down your main topic or the full content you want the AI to break into a thread.
                            Be as detailed as possible for the best results.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            <Label htmlFor="thread-idea">Idea / Prompt</Label>
                            <Textarea
                                id="thread-idea"
                                value={idea}
                                onChange={handleIdeaChange}
                                placeholder="e.g., My top 5 tips for learning Next.js effectively..."
                                className="min-h-[120px] focus-visible:ring-primary resize-none"
                                rows={5}
                                disabled={isLoading || isPublishing}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button onClick={handleGenerateThread} disabled={isLoading || isPublishing || !idea.trim()}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Wand2 className="mr-2 h-4 w-4" />
                            )}
                            Generate Thread
                        </Button>
                    </CardFooter>
                </Card>

                {/* Error / Success Messages */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {publishSuccess && (
                    <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400">
                         <Wand2 className="h-4 w-4" /> {/* Using Wand2 as a placeholder success icon */}
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{publishSuccess}</AlertDescription>
                    </Alert>
                )}


                {/* Generated Thread Section */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center space-y-3 py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">AI is weaving your thread...</p>
                    </div>
                )}

                {!isLoading && generatedThread.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Thread</CardTitle>
                            <CardDescription>
                                Review and edit the generated tweets below. You can add or remove tweets as needed.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {generatedThread.map((tweet, index) => (
                                <div key={tweet.id} className="space-y-2 rounded-md border p-4 shadow-sm bg-card">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor={`tweet-${tweet.id}`}>Tweet {tweet.order} / {generatedThread.length}</Label>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => handleAddTweet(index)} aria-label="Add tweet after this one">
                                                <PlusSquare className="h-4 w-4 text-muted-foreground hover:text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveTweet(tweet.id)} aria-label="Remove this tweet" disabled={generatedThread.length <= 1}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Textarea
                                        id={`tweet-${tweet.id}`}
                                        value={tweet.content}
                                        onChange={(e) => handleTweetContentChange(tweet.id, e.target.value)}
                                        className="min-h-[80px] focus-visible:ring-primary"
                                        rows={3}
                                        disabled={isPublishing}
                                    />
                                    <p className="text-xs text-right text-muted-foreground">
                                      {tweet.content.length} / 280
                                    </p>
                                </div>
                            ))}
                             <Button variant="outline" onClick={() => handleAddTweet()} className="w-full mt-2">
                                <PlusSquare className="mr-2 h-4 w-4" /> Add Tweet at End
                            </Button>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button onClick={handlePublishThread} disabled={isPublishing || generatedThread.length === 0}>
                                {isPublishing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="mr-2 h-4 w-4" />
                                )}
                                Publish Thread
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </main>
    </div>
  );
}