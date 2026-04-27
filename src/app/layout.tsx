import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dotmatrix",
});

export const metadata: Metadata = {
  title: "VaSol LDR Widget",
  description: "A live weather widget for London & San Francisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${silkscreen.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
