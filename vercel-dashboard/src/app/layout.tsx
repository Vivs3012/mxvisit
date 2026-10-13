import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One year plan 2027",
  description: "Store visits, meetings and trip synthesis dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
