import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "finance Visualizer Task",
  description: "Created by Pushpit Jain",
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
