"use client";

import React from "react";
import {
  LayoutTemplate,
  ArrowDownToLine,
  Trash2,
  FileText,
  CheckSquare,
  Megaphone,
  Music,
  HelpCircle,
  LayoutDashboard,
  Code2,
  Bird,
  PlusCircle,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIState } from "@/lib/context/UIStateContext";
import { X } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useUIState();

  const mainLinks = [
    { icon: LayoutTemplate, label: "Templates", href: "/templates" },
    { icon: ArrowDownToLine, label: "Import", href: "/import" },
    { icon: Trash2, label: "Trash", href: "/trash" },
  ];

  const workspaceLinks = [
    { icon: FileText, label: "Notes", href: "/", active: true },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: Music, label: "Music", href: "/music" },
    { icon: HelpCircle, label: "Questions", href: "/questions" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Code2, label: "Development", href: "/development" },
    { icon: Bird, label: "Swift", href: "/swift" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-background border-r border-border flex flex-col p-6 transition-all duration-300 z-50 lg:static lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      } font-dm-sans`}
    >
      {/* Logo & Close */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-foreground dark:bg-background rounded-lg flex items-center justify-center">
          <span className="text-background dark:text-foreground font-bold text-lg">
            U
          </span>
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">
          Awsmd
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto text-muted-foreground hover:text-foreground transition-colors lg:hidden"
        >
          <X size={20} />
        </button>
        <button className="hidden lg:block ml-auto text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="space-y-1 mb-10">
        {mainLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all font-medium"
          >
            <link.icon size={20} strokeWidth={2} />
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Workspace */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] px-3 mb-4">
          Workspace
        </h3>
        <nav className="space-y-1">
          {workspaceLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all font-medium group ${
                link.active
                  ? "bg-muted/80 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon
                  size={20}
                  strokeWidth={2}
                  className={
                    link.active
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground transition-colors"
                  }
                />
                <span className="text-sm">{link.label}</span>
              </div>
              {link.active && (
                <MoreHorizontal size={16} className="text-muted-foreground" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="pt-6 mt-auto border-t border-border space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
          <PlusCircle size={20} className="text-foreground" />
          <span className="text-sm">New Page</span>
        </button>
        <Link
          href="/register"
          className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
            <span className="text-[10px] font-bold">R</span>
          </div>
          <span className="text-sm">Register / Account</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
