import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/app/components/Toast/ToastContext";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { UIStateProvider } from "@/lib/context/UIStateContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SmartNotes | Professional Dashboard",
  description: "Organize your ideas with style",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <ToastProvider>
          <ThemeProvider>
            <UIStateProvider>{children}</UIStateProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
