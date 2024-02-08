"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

function LandingHero() {
  const { isSignedIn } = useAuth();

  return (
    <section className="py-36 space-y-5 text-center text-white font-bold">
      <h1 className="space-y-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
        <span className="block">The Best AI Tool for</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot",
                "Photo Generation",
                "Video Generation",
                "Music Generation",
                "Code Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </h1>
      <p className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster
      </p>
      <Button
        className="p-4 md:p-6 md:text-lg font-semibold rounded-full"
        variant="premium"
        asChild
      >
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          Start Generation for free
        </Link>
      </Button>
      <p className="text-zinc-500 text-xs md:text-sm font-normal">
        No credit card required
      </p>
    </section>
  );
}

export default LandingHero;
