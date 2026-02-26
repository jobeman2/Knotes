"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function TestPage() {
  useEffect(() => {
    console.log("Firebase Auth instance:", auth);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-background text-foreground transition-colors">
      <div className="p-10 text-xl font-bold rounded-2xl border-4 border-primary/20 bg-primary/5 text-primary shadow-xl">
        Firebase test running ✔ Check console
      </div>
    </div>
  );
}
