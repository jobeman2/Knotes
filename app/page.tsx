"use client";

import React from "react";
import Sidebar from "./layouts/sidebar/sidebar";
import Header from "./layouts/header/header";
import NoteList from "./components/dashboard/NoteList";
import NoteEditor from "./components/dashboard/NoteEditor";
import { useUIState } from "@/lib/context/UIStateContext";

export default function Home() {
  const { activeMobileView, isSidebarOpen, setSidebarOpen } = useUIState();

  return (
    <div className="flex h-screen bg-background text-foreground font-dm-sans transition-colors overflow-hidden relative">
      {/* Column 1: Responsive Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Column 2: Note List (Visible on desktop or if active view is 'list') */}
          <div
            className={`flex-none lg:flex h-full ${
              activeMobileView === "list" ? "flex" : "hidden"
            } w-full lg:w-auto`}
          >
            <NoteList />
          </div>

          {/* Column 3: Note Editor (Visible on desktop or if active view is 'editor') */}
          <div
            className={`flex-1 lg:flex h-full ${
              activeMobileView === "editor" ? "flex" : "hidden lg:flex"
            }`}
          >
            <NoteEditor />
          </div>
        </div>
      </div>

      {/* Mobile Backdrop for Sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
