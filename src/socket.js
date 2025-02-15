import { io } from "socket.io-client";
import { WEBSOCKET_URL } from "./constants/variables";

// Create a socket instance
export const socket = io(WEBSOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

// Add event listeners for connection status
socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

// Export the socket instance
export default socket;
