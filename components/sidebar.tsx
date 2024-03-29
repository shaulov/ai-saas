"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import FreeCounter from "@/components/free-counter";
import { routes } from "@/const";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

function Sidebar({ apiLimitCount = 0, isPro = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full space-y-4 py-4 text-white bg-[#111827]">
      <div className="flex-1 px-3 py-2">
        <div className="relative flex items-center mb-14 pl-3">
          <Image
            className="mr-4"
            width={32}
            height={32}
            src="/logo.png"
            alt="Logo"
          />
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            <Link
              className="before:content-[''] before:absolute before:inset-0 before:w-full before:h-full"
              href="/dashboard"
            >
              Genius
            </Link>
          </h1>
        </div>
        <ul className="space-y-1">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                className={cn(
                  "flex flex-1 items-center justify-start w-full p-3 text-sm font-medium rounded-lg transition hover:text-white hover:bg-white/10",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400",
                )}
                href={route.href}
              >
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </nav>
  );
}

export default Sidebar;
