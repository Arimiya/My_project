import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PosSuite | Subscription POS for SMEs",
  description: "A modern subscription-based POS system for small and medium enterprises."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
