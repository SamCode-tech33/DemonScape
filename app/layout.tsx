import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demon Scape",
  description: "2D Top-Down RPG Game",
  icons: {
    icon: "/ds-icon.png",
  },
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
