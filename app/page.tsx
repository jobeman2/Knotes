import React from "react";
import Sidebar from "./layouts/sidebar/sidebar";
import Header from "./layouts/header/header";
import NoteList from "./components/dashboard/NoteList";
import NoteEditor from "./components/dashboard/NoteEditor";

export default function Home() {
  return (
    <div className="flex h-screen bg-background text-foreground font-dm-sans transition-colors overflow-hidden">
      {/* Column 1: Fixed Sidebar */}
      <Sidebar />

      {/* Column 2 & 3: Header + Sub-layout */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Column 2: Note List */}
          <NoteList />

          {/* Column 3: Note Editor */}
          <NoteEditor />
        </div>
      </div>
    </div>
  );
}
