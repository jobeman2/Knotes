"use client";

import React from "react";
import Image from "next/image";
import { Plus, Type, MoreHorizontal, ChevronLeft } from "lucide-react";
import { useUIState } from "@/lib/context/UIStateContext";

const NoteEditor = () => {
  const { setActiveMobileView } = useUIState();

  return (
    <div className="flex-1 flex flex-col bg-background p-6 lg:p-10 font-dm-sans overflow-y-auto">
      {/* Mobile Back Button */}
      <button
        onClick={() => setActiveMobileView("list")}
        className="lg:hidden flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="text-sm font-bold uppercase tracking-wider">Back</span>
      </button>
      {/* Illustration / Image section */}
      <div className="w-full max-w-2xl mx-auto mb-12 flex justify-center py-10 bg-muted rounded-[3rem] border border-border/40 transition-colors">
        <div className="relative w-72 h-44 opacity-80 hover:opacity-100 transition-opacity">
          {/* Mocked Illustration using CSS/SVG patterns if I can't generate image right now */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-900/20 rounded-2xl flex items-center justify-center border border-primary/10">
            <div className="text-primary/20 dark:text-primary/40">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full relative">
        {/* Title and Tags */}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-muted-foreground/30 font-bold text-sm mt-1.5 uppercase">
            H1
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Write down your ideas 💡
          </h1>
        </div>

        <div className="flex gap-3 mb-10 pl-9">
          <span className="text-primary/80 font-bold text-xs uppercase tracking-widest cursor-pointer hover:underline">
            #ideas
          </span>
          <span className="text-primary/80 font-bold text-xs uppercase tracking-widest cursor-pointer hover:underline">
            #to-do's
          </span>
          <span className="text-primary/80 font-bold text-xs uppercase tracking-widest cursor-pointer hover:underline">
            #morning
          </span>
        </div>

        {/* Content Body */}
        <div className="pl-9 space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "Sometimes, on Mondays, when servers at A16 are announcing the
            specials, you can almost feel the excitement at the table when the
            waiters say, 'And of course, since it's Monday ... we have
            meatballs.'" says Shelley Lingren.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-muted-foreground/30 font-bold text-sm mt-1 uppercase">
                H3
              </span>
              <h3 className="text-2xl font-bold text-foreground">Morning</h3>
            </div>

            <div className="space-y-3">
              {[
                { label: "setup meeting with Rachel", checked: true },
                { label: "apply at Braintree", checked: false },
                { label: "check to-dos", checked: false },
                { label: "check reservations", checked: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                      item.checked
                        ? "bg-primary border-primary shadow-sm"
                        : "border-border/60 group-hover:border-primary/50"
                    }`}
                  >
                    {item.checked && (
                      <div className="w-1.5 h-1.5 bg-surface rounded-full" />
                    )}
                  </div>
                  <span
                    className={`text-base font-medium transition-colors ${
                      item.checked
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Toolbars (Mocked from UI) */}
        <div className="fixed bottom-12 right-12 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-500">
          <button className="w-12 h-12 bg-surface rounded-2xl shadow-xl flex items-center justify-center text-foreground hover:bg-muted transition-all border border-border/40 active:scale-95">
            <Plus size={24} />
          </button>
          <button className="px-6 h-12 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl shadow-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95">
            Aa
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
