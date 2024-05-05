import "./globals.css";

import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "lib/utils";

const title = "FAQ Generator";
const description =
  "The FAQ Generator uses Groq's models to create FAQs from text.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: "website",
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body
        className={cn(
          GeistSans.variable,
          "antialiased bg-white text-sm md:text-base text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200",
        )}
      >
        {children}
      </body>
    </html>
  );
}
