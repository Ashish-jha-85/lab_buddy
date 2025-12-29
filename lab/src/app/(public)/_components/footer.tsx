"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Mail } from "lucide-react";
import { data } from "@/lib/constant";

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/40 backdrop-blur-sm shadow-inner mt-10">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/80">
        {/* Left side — Logo / Title */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          <h1 className="ml-2 font-semibold text-green-400">VirtualLab</h1>
        </div>

        {/* Center — Links */}
        <div className="flex items-center gap-5 mb-4 md:mb-0">
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
        </div>

        {/* Right side — Social Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/"
            target="_blank"
            className="text-foreground/60 hover:text-green-400 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            className="text-foreground/60 hover:text-green-400 transition-colors duration-200"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:contact@virtuallab.dev"
            className="text-foreground/60 hover:text-green-400 transition-colors duration-200"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <Separator className="opacity-30" />

      {/* Bottom Copyright */}
      <div className="text-center py-4 text-xs text-foreground/60">
        © {new Date().getFullYear()} {data.appNameLogo} — Built for Developers 🧠
      </div>
    </footer>
  );
}
