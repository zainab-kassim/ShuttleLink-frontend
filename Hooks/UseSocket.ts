"use client"
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://shuttlelink-backend.onrender.com"; // Your backend URL

export const useSocket = (): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("role");

        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to server:", newSocket.id);

            //  Send "set_user" event ONLY if the user is a driver
            if (userId && userRole) {
                newSocket.emit("set_user", { id: userId, role: userRole });
            }
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            newSocket.close(); // Cleanup on unmount
        };
    }, []); // Run only once on mount

    return socket;
};