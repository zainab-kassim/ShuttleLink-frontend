import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "./socketProvider";




export const metadata: Metadata = {
  title: "Shuttle Link",
  description: "transportation service website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <SocketProvider>
        {children}
        </SocketProvider>
      </body>
    </html>
  );
}