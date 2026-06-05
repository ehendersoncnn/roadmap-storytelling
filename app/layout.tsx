import type { Metadata } from "next";
import "./globals.css";
import { NuqsProvider } from "./components/NuqsProvider";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "CAL Roadmap — Storytelling / Content Accelerator Lab",
  description:
    "Q3 2026–Q1 2027 product roadmap for the Storytelling / Content Accelerator Lab at CNN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NuqsProvider>{children}</NuqsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
