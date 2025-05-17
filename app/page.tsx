import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { cn } from "@/lib/utils";

import Image from 'next/image';
import backgroundImage from "@/public/atoms.webp";
import favicon from "../public/favicon.ico";

import {
  Feather,
  Sparkles,
  ListChecks,
  Zap,
  Twitter,
  MoveRight,
} from 'lucide-react';

export const metadata = {
  icons: {
    icon: favicon.src
  },
  title: "Threax - Effortless Twitter Thread Generation",
  description: "Transform your ideas into engaging Twitter threads with AI-powered assistance. Sign up for Threax today!",
};

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Let our smart AI help you break down complex ideas into digestible, engaging tweets for your thread.",
  },
  {
    icon: Feather,
    title: "Intuitive Editor",
    description: "Easily write, edit, and reorder your tweets in a clean, focused interface before publishing.",
  },
  {
    icon: ListChecks,
    title: "Structured Threads",
    description: "Ensure your threads are perfectly sequenced and easy to follow, maximizing reader engagement.",
  },
  {
    icon: Zap,
    title: "Publish with Ease",
    description: "Once you're ready, publish your complete thread directly to Twitter in just a few clicks.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground items-center">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Twitter className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">Threax</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-sm font-medium"
              )}
            >
              Login
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "text-sm font-medium"
              )}
            >
              Get Started
              <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
              Weave Your Ideas into <span className="text-primary">Captivating</span> Twitter Threads
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Stop wrestling with character limits. Thread Weaver helps you effortlessly craft, organize, and publish engaging Twitter threads with AI-powered assistance.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Start Weaving for Free
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>

            </div>
            <div className="mt-12 md:mt-16">
              {/* Placeholder for a product image/video screenshot */}
              <div className="relative">
                 <div className="aspect-[16/9] rounded-xl border bg-muted shadow-lg flex items-center justify-center">
                    <p className="text-2xl font-semibold text-muted-foreground">
                        {/* Your Product Screenshot Here */}
                        <Image
                            src={backgroundImage}
                            alt="Thread Weaver Interface Mockup"
                            className="rounded-xl object-cover"
                        />
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Features Section */}
        <section id="features" className="py-16 md:py-20">
          <div className="container px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Everything You Need, Nothing You Don&apos;t
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Focus on your content. We&apos;ll handle the complexities of thread creation.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* How It Works (Simplified) */}
        <section id="how-it-works" className="py-16 md:py-20 bg-muted/50">
            <div className="container px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                        Get Started in 3 Easy Steps
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        From idea to published thread in minutes.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-2xl font-bold text-primary">1</div>
                        <h3 className="text-xl font-semibold">Input Your Idea</h3>
                        <p className="mt-2 text-muted-foreground">
                            Provide your core message or detailed notes. Our AI is ready to listen.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-2xl font-bold text-primary">2</div>
                        <h3 className="text-xl font-semibold">Generate & Refine</h3>
                        <p className="mt-2 text-muted-foreground">
                            Watch the AI craft your thread, then easily edit, add, or reorder tweets.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-2xl font-bold text-primary">3</div>
                        <h3 className="text-xl font-semibold">Publish to Twitter</h3>
                        <p className="mt-2 text-muted-foreground">
                            Connect your Twitter account and publish your polished thread directly.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Ready to Elevate Your Twitter Game?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join Thread Weaver today and start creating impactful Twitter threads without the hassle.
            </p>
            <div className="mt-8">
              <Link
                href="/login" // Or /signup
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Sign Up Now - It&apos;s Free!
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Twitter className="h-5 w-5 text-muted-foreground" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by Thread Weaver. The source code is not yet available.
              Illustrations by <a href="https://lucide.dev/icons/" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Lucide Icons</a>.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Thread Weaver. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}