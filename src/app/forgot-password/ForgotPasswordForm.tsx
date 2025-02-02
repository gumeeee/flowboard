"use client";

import { Icons } from "@/components/Icons";
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
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/utils/auth";
import { getAuthError } from "@/utils/auth-errors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await auth.resetPasswordRequest(email);
      toast({
        title: "Check your email 📩",
        description: response.message,
      });
      router.push("/login");
    } catch (error) {
      const { message } = getAuthError(error);
      toast({
        variant: "destructive",
        title: "Reset Password Error",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription className="text-xs">
            Enter your email address and we will send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <Button className="w-full" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-3 h-4 w-5 animate-spin" />
            )}
            Send reset link
          </Button>
        </CardContent>
        <CardFooter>
          <div className="text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
