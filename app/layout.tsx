'use client'
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

  const socket = useSocket();

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", "Hello from Next.js!");
    }
  };

  return (
    <html lang="en">
      <body>
        {children}
        <button onClick={sendMessage}>Send Message</button>
      </body>
    </html>
  );
}