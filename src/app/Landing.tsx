"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const FeaturesList = () => {
  const features = [
    "Intuitive Kanban Boards",
    "Real-time collaboration",
    "Custom workflows",
    "Advanced task tracking",
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4 pt-4 max-w-[600px] mx-auto">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="flex items-center gap-2 group"
        >
          <CheckCircle2 className="h-5 w-5 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
          <span className="text-muted-foreground transition-colors group-hover:text-foreground group-hover:translate-x-2">
            {feature}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = ({ user }: { user: IUser | null }) => {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 mb-20 px-4">
      {/* Text Content with Creative Layout */}
      <motion.div
        className="lg:flex-1 space-y-8 relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-6">
          <motion.div
            className="inline-flex flex-col"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm font-mono text-primary mb-2">
              {user
                ? `Welcome back, ${user.email}!`
                : "Next-gen Task Management"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Transform Your
              <br />
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Workflow Collaboratively
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-muted-foreground max-w-[600px] lg:max-w-full mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Goes beyond basic to-do lists, offering intuitive tools for
            <span className="px-1 border-b-2 border-primary/40">
              team-driven productivity
            </span>
            and intelligent task management.
          </motion.p>
        </div>

        {/* Interactive Action Section */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user ? (
            <Button
              size="lg"
              asChild
              className="relative overflow-hidden group"
            >
              <Link href="/projects">
                <span className="relative z-10 flex items-center gap-2">
                  Continue Working
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                asChild
                className="relative overflow-hidden hover:-translate-y-0.5 transition-transform"
              >
                <Link href="/create-account">
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <span>Enterprise Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </motion.div>

        <FeaturesList />
      </motion.div>
    </div>
  );
};

const ThemeImage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow:
          resolvedTheme === "dark"
            ? "0 25px 50px -5px rgba(255, 255, 255, 0.25)"
            : "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 200,
      }}
      className="relative h-full w-full rounded-xl overflow-hidden md:w-[120%] md:h-[120%]" // Alteração aqui
    >
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
        <div className="relative aspect-video">
          {" "}
          {/* Container com aspect ratio */}
          <Image
            src={
              resolvedTheme === "dark"
                ? "/projex-dark.png"
                : "/projex-light.png"
            }
            alt="App preview"
            fill // Preenche o container pai
            className="rounded-lg object-contain hover:opacity-95 transition-opacity" // object-contain mantém proporção
            priority
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      <div className="absolute inset-0 border border-border/20 rounded-xl pointer-events-none" />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Collaborative Boards",
      description: "Real-time collaboration with your team",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    },
    {
      title: "Smart Analytics",
      description: "Track progress with interactive dashboards",
      icon: <CheckCircle2 className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Integrations",
      description: "Connect with your favorite tools",
      icon: <CheckCircle2 className="h-6 w-6 text-cyan-500" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <AnimatePresence>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
            className="p-8 bg-background/80 backdrop-blur rounded-xl border border-border/30 hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const BackgroundElements = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-background">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-background" />
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="h-[40rem] w-[40rem] rounded-full bg-radial-gradient from-primary/20 to-transparent blur-3xl" />
    </motion.div>
  </div>
);

export const Landing: React.FC = () => {
  const supabase = createClient();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Configuração do parallax
  const { scrollY } = useScroll({
    container: containerRef,
  });
  const y = useTransform(scrollY, [0, 500], [0, -200]);

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

    return () => subscription?.unsubscribe();
  }, [supabase.auth]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container pt-32 pb-20">
        {/* HeroSection com FeaturesList interno */}
        <HeroSection user={user} />

        {/* ThemeImage otimizado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto rounded-xl border border-border/20 shadow-lg"
        >
          <ThemeImage />
        </motion.div>
      </div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FeaturesSection />
      </motion.div>

      <BackgroundElements />
    </div>
  );
};
