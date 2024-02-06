"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { tools } from "@/const";

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <ul className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Card className="relative flex items-center gap-x-4 p-4 border-black/5 transition hover:shadow-md">
              <span className={cn("w-fit p-2 rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </span>
              <h3 className="w-full font-semibold">
                <Link
                  className="before:content-[''] before:absolute before:inset-0 before:w-full before:h-full"
                  href={tool.href}
                >
                  {tool.label}
                </Link>
              </h3>
              <ArrowRight className="shrink-0 w-5 h-5" />
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
