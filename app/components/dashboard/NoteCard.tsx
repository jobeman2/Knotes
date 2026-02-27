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

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  excerpt,
  time,
  location,
  active,
  hasCircle,
}) => {
  return (
    <div
      className={`p-5 rounded-3xl transition-all cursor-pointer group mb-2 border-2 ${
        active
          ? "bg-amber-100/60 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800"
          : "bg-surface border-transparent hover:border-border hover:bg-muted/50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base leading-tight pr-4 line-clamp-1">
          {title}
        </h4>
        {hasCircle && (
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-200" />
        )}
      </div>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 line-clamp-2 leading-relaxed mb-4">
        {excerpt}
      </p>
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-zinc-300 dark:text-zinc-600">{time}</span>
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
