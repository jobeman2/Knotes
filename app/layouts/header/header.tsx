"use client";

import React from "react";
import { Search, Pin, Download, MoreHorizontal } from "lucide-react";
import ThemeSelector from "@/app/components/ThemeSelector";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md sticky top-0 z-30 font-dm-sans transition-colors border-b border-border">
      {/* Left section (Search placeholder - mocked as in image) */}
      <div className="flex-1 flex justify-center max-w-xl mx-auto">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full bg-muted border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground"
            placeholder="Search notes"
          />
        </div>
      </div>

      {/* Metadata / Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-border pr-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors bg-surface p-1.5 rounded-lg shadow-sm border border-border">
            <Pin size={18} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors bg-surface p-1.5 rounded-lg shadow-sm border border-border">
            <Download size={18} />
          </button>
        </div>

        {/* User / Collaboration section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <Link
              href="/register"
              className="text-sm font-bold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              Register
            </Link>
          </div>

          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-surface bg-muted overflow-hidden flex items-center justify-center text-[10px] font-bold text-foreground ring-1 ring-border"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <button className="w-8 h-8 rounded-full border-2 border-surface bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ring-1 ring-border">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
