"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

function LandingNavbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-transparent">
      <Link className="flex items-center" href="/">
        <Image
          className="mr-4"
          src="/logo.png"
          width={32}
          height={32}
          alt="Logo"
        />
        <span className={cn("text-2xl font-bold text-white", font.className)}>
          Genius
        </span>
      </Link>
      <Button className="rounded-full" variant="outline" asChild>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          Get Started
        </Link>
      </Button>
    </nav>
  );
}

export default LandingNavbar;
