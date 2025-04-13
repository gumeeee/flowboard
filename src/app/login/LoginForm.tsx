"use client";

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
import Link from "next/link";
import { OAuthSignIn } from "@/components/auth/OAuthSignIn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/utils/auth";
import { getAuthError } from "@/utils/auth-errors";
import { Icons } from "@/components/Icons";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await auth.signIn(email, password);
      router.push("/projects");
      router.refresh();
      toast({
        variant: "default",
        title: "Logged successfully ✅",
        description: "successfully signed in",
      });
    } catch (error) {
      console.error("Auth error:", error);
      const { message } = getAuthError(error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-xs">Welcome back!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/create-account" className="text-blue-600">
              Create account
            </Link>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-blue-600">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-full" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-3 h-4 w-5 animate-spin" />
            )}
            Sign In
          </Button>
        </CardContent>
        <CardFooter>
          <OAuthSignIn />
        </CardFooter>
      </form>
    </Card>
  );
}
