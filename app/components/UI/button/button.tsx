"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  loading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full bg-primary text-primary-foreground
        p-3 rounded-xl font-bold
        transition-all active:scale-[0.98]
        hover:opacity-90 disabled:opacity-60
        ${className || ""}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
