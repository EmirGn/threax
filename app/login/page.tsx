// /pages/login.tsx
'use client'; // Necessary for client-side interactivity like onClick and useState

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Head from "next/head";
import { useState, ChangeEvent, FormEvent, JSX } from "react"; // For handling form input and events

// Optional: For icons, e.g., from lucide-react
// import { Twitter as TwitterIcon, Chrome as GoogleIcon } from "lucide-react";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Example loading state

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleCredentialLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement credential-based authentication logic here
    // This would typically involve an API call
    console.log("Attempting to sign in with credentials:", { email, password });
    // Example:
    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (response.ok) {
    //     // Handle successful login, e.g., redirect
    //     // router.push('/dashboard');
    //   } else {
    //     // Handle errors, e.g., show an error message
    //     const errorData = await response.json();
    //     console.error("Login failed:", errorData.message);
    //   }
    // } catch (error) {
    //   console.error("An unexpected error occurred:", error);
    // } finally {
    //   setIsLoading(false);
    // }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsLoading(false);
  };

  const handleLoginWithTwitter = (): void => {
    setIsLoading(true);
    // TODO: Implement Twitter OAuth authentication logic here
    console.log("Attempting to sign in with Twitter...");
    // Example: window.location.href = '/api/auth/twitter';
    // Simulate loading and then reset
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleLoginWithGoogle = (): void => {
    setIsLoading(true);
    // TODO: Implement Google OAuth authentication logic here
    console.log("Attempting to sign in with Google...");
    // Example: window.location.href = '/api/auth/google';
    // Simulate loading and then reset
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      <Head>
        <title>Login - Thread Weaver</title>
        <meta name="description" content="Login or create an account to start generating Twitter threads with Thread Weaver." />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 selection:bg-primary/20">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight"> {/* Added tracking-tight */}
              Threax
            </CardTitle>
            <CardDescription>
              Sign in to weave your ideas into captivating Twitter threads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <form onSubmit={handleCredentialLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full hover:cursor-pointer" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"> {/* Adjusted for better layout on small screens */}
              <Button
                variant="outline"
                onClick={handleLoginWithTwitter}
                className="w-full"
                disabled={isLoading}
              >
                {/* <TwitterIcon className="mr-2 h-4 w-4" /> */}
                Sign in with Twitter
              </Button>
              <Button
                variant="outline"
                onClick={handleLoginWithGoogle}
                className="w-full"
                disabled={isLoading}
              >
                {/* <GoogleIcon className="mr-2 h-4 w-4" /> */}
                Sign in with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 text-center text-sm"> {/* Slightly larger text */}
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a href="#" className="font-medium text-primary hover:underline hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm">
                Sign up
              </a>
              {/* TODO: Link to a registration page if applicable */}
            </p>
            <p className="text-xs text-muted-foreground px-2"> {/* Added padding for longer text */}
              By signing in, you agree to our{' '}
              <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm">Terms of Service</a> and {' '}
              <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}