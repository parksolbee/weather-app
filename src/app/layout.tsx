import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaSol Weather Widget",
  description: "A live weather widget for London & San Francisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
