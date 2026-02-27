"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

interface NoteCardProps {
  title: string;
  excerpt: string;
  time: string;
  location?: string;
  active?: boolean;
  hasCircle?: boolean;
}

import { useUIState } from "@/lib/context/UIStateContext";

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  excerpt,
  time,
  location,
  active,
  hasCircle,
}) => {
  const { setActiveMobileView } = useUIState();

  return (
    <div
      onClick={() => setActiveMobileView("editor")}
      className={`p-5 rounded-3xl transition-all cursor-pointer group mb-2 border ${
        active
          ? "bg-amber-100/40 dark:bg-amber-900/20 border-amber-200/60 dark:border-amber-800/40"
          : "bg-transparent border-transparent hover:bg-muted/10 dark:hover:bg-muted/20"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-foreground text-base leading-tight pr-4 line-clamp-1">
          {title}
        </h4>
        {hasCircle && (
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-200" />
        )}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
        {excerpt}
      </p>
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground/50">{time}</span>
          {location && (
            <span className="text-amber-600/80 dark:text-amber-400/80">
              {location}
            </span>
          )}
        </div>
        {active && (
          <div className="flex items-center -space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-white dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-700 ring-1 ring-zinc-50"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
