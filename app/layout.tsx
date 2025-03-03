import type { Metadata } from "next";
import "./globals.css";
import { useSocket } from "../Hooks/UseSocket";



const metadata: Metadata = {
  title: "Shuttle Link",
  description: "transportation service website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useSocket();
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}