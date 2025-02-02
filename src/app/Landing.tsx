"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const FeaturesList = () => {
  const features = [
    "Intuitive Kanban Boards",
    "Real-time collaboration",
    "Custom workflows",
    "Advanced task tracking",
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4 pt-4 max-w-[600px] mx-auto">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-2 group">
          <CheckCircle2 className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
          <span className="text-muted-foreground transition-colors group-hover:text-foreground">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
};

const HeroSection = ({ user }: { user: IUser | null }) => {
  return (
    <div className="max-w-[800px] mx-auto text-center space-y-8 mb-20">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Transform your workflow,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Together, step by step
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Goes beyond basic to-do lists, offering intuitive tools for
          prioritizing and managing projects and tasks with ease.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {user ? (
          <Button size="lg" asChild className="animate-pulse-once">
            <Link href="/projects" className="gap-2">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <>
            <Button
              size="lg"
              asChild
              className="hover:-translate-y-1 transition-transform"
            >
              <Link href="/create-account" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="hover:bg-primary/10 hover:-translate-y-1 transition-transform"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </>
        )}
      </div>

      <FeaturesList />
    </div>
  );
};

const ThemeImage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-20">
      <div className="relative group">
        <div
          className={`
          relative bg-background/95 backdrop-blur rounded-lg 
          transition-all duration-700 group-hover:scale-[99%]
          ${
            resolvedTheme === "dark"
              ? "shadow-[0_35px_60px_-15px_rgba(255,255,255,0.15)]"
              : "shadow-2xl"
          }
        `}
        >
          <Image
            src={
              resolvedTheme === "dark"
                ? "/projex-dark.png"
                : "/projex-light.png"
            }
            alt="App preview"
            width={1824}
            height={1080}
            className="rounded-lg w-full hover:opacity-95 transition-opacity"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>
      </div>
    </div>
  );
};

const BackgroundElements = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-background">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-background" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
    </div>
  </div>
);

export const Landing: React.FC = () => {
  const supabase = createClient();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container pt-32 pb-20">
        <HeroSection user={user} />
        <ThemeImage />
      </div>
      <BackgroundElements />
    </div>
  );
};
