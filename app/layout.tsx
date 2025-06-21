import type { Metadata } from "next";
import "./globals.css";

// TODO: Setup custom fonts here

export const metadata: Metadata = {
  title: "BucketList",
  description: "Discover and Curate travel iternaries by the travel influencers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
