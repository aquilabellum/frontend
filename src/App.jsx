import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import MapComponent from "./components/MapComponent";
import { WEBSOCKET_URL } from "./constants";
import { io } from "socket.io-client";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [initialState, setInitialState] = useState(null);

  const subscribe = useCallback(
    (topic) => {
      if (socket?.connected) {
        console.log(`Subscribing to ${topic}`);
        socket.emit("subscribe", [topic]);
      }
    },
    [socket]
  );

  const unsubscribe = useCallback(
    (topic) => {
      if (socket?.connected) {
        console.log(`Unsubscribing from ${topic}`);
        socket.emit("unsubscribe", topic);
      }
    },
    [socket]
  );

  useEffect(() => {
    const newSocket = io(WEBSOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      console.log("Socket.IO connected");
      setIsConnected(true);

      const topics = [
        "spawnEntity",
        "detection",
        "locationChanged",
        "supportNeeded",
        "dartStatusUpdate",
      ];
      topics.forEach((topic) => subscribe(topic));
    };

    const onDisconnect = () => {
      console.log("Socket.IO disconnected");
      setIsConnected(false);
    };

    const eventHandlers = {
      dartStatusUpdate: (data) => console.log("dartStatusUpdate", data),
      spawnEntity: (data) => console.log("spawnEntity", data),
      detection: (data) => console.log("detection", data),
      locationChanged: (data) => console.log("locationChanged", data),
      supportNeeded: (data) => console.log("supportNeeded", data),
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      Object.keys(eventHandlers).forEach((event) => {
        socket.off(event);
      });
      socket.offAny();
    };
  }, [socket, subscribe]);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await fetch(`${WEBSOCKET_URL}/api/initialState`);
        const data = await response.json();
        console.log("Initial state:", data);
        setInitialState(data);
      } catch (error) {
        console.error("Failed to fetch initial state:", error);
      }
    };
    fetchInitialState();
  }, []);

  return (
    <div>
      <HeaderComponent isConnected={isConnected} />
      <MapComponent />
    </div>
  );
}

export default App;
