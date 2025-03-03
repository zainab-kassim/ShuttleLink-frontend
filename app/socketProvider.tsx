"use client";
import { useSocket } from "../Hooks/UseSocket";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  useSocket();
  return <>{children}</>;
}
