import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BasePage from "@/components/base"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Click Sale System",
  description: "Simple Sales Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BasePage>
          {children}
        </BasePage>
      </body>
    </html>
  );
}
