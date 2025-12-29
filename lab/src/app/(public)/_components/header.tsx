"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "./auth-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { data } from "@/lib/constant";

export function PublicHeader() {
  return (
    <header className="sticky top-0 flex items-center justify-between px-4 py-2 border-b rounded-t-md shadow-inner bg-muted/40 backdrop-blur-sm">
      {/* Left side — Terminal-style dots + title */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_4px_#ff4d4d]" />
        <span className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_4px_#facc15]" />
        <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_4px_#4ade80]" />
        <h1 className="ml-2 font-semibold text-sm text-green-400 tracking-wide">
          {data.appNameLogo}
        </h1>
      </div>

      {/* Right side — Navigation links */}
      <nav className="flex items-center gap-6 text-sm text-foreground/80 font-medium">
        <Link
          href="/"
          className="hover:text-green-400 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="#features"
          className="hover:text-green-400 transition-colors duration-200"
        >
          Features
        </Link>
        <Link
          href="#about"
          className="hover:text-green-400 transition-colors duration-200"
        >
          About
        </Link>
        <Link
          href="#contact"
          className="hover:text-green-400 transition-colors duration-200"
        >
          Contact
        </Link>

        <Button
          asChild
          size="sm"
          className="ml-3 h-8 px-4 bg-green-700 hover:bg-green-600 text-white"
        >
          <Link href="/code">Launch Editor</Link>
        </Button>
        <ModeToggle />
        <AuthDialog />
      </nav>
    </header>
  );
}
