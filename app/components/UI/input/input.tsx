"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-foreground/80 font-medium text-sm">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full mt-1.5 p-2.5 border rounded-xl
          bg-muted/30 border-border/60 text-foreground
          focus:ring-2 focus:ring-primary/20 outline-none
          transition-all
          ${error ? "border-red-500 focus:ring-red-200" : ""}
          ${className || ""}
        `}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
