import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_URL } from "../constants";

import mapImage from "../assets/map.png";
import friendlyDrone from "../assets/friendly-drone.png";
import dartIcon from "../assets/dart-icon.svg";
import receiverDroneIcon from "../assets/friendly-drone.png";
import enemyTank from "../assets/enemy-tank.png";
import friendlySoldier from "../assets/friendly-soldier.png";

import "../styles/map.css";

const entityIcons = {
  dartDeploymentDrone: friendlyDrone,
  dataReceiverDrone: receiverDroneIcon,
  dart: dartIcon,
  tank: enemyTank,
  soldier: friendlySoldier,
};

function MapComponent() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [entities, setEntities] = useState([]);

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

    const handleDartStatusUpdate = (data) => {
      console.log("dartStatusUpdate", data);
    };

    const handleSpawnEntity = (data) => {
      console.log("spawnEntity", data);
    };

    const handleDetection = (data) => {
      console.log("detection", data);
    };

    const handleLocationChanged = (data) => {
      console.log("locationChanged", data);
    
      setEntities((prevEntities) => {
        return prevEntities.map((entity) => {
          if (entity.id === data.entity_id) {
            return { ...entity, absoluteCoordinates: data.absoluteCoordinates };
          }
          return entity;
        });
      });
    };

    const handleSupportNeeded = (data) => {
      console.log("supportNeeded", data);
    };

    const eventHandlers = {
      dartStatusUpdate: handleDartStatusUpdate,
      spawnEntity: handleSpawnEntity,
      detection: handleDetection,
      locationChanged: handleLocationChanged,
      supportNeeded: handleSupportNeeded,
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    socket.onAny((event, ...args) => {
      console.log(`Received event: ${event}`, args);
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
        setEntities(data.entities || []);
      } catch (error) {
        console.error("Failed to fetch initial state:", error);
      }
    };
    fetchInitialState();
  }, []);

  return (
    <div className="map-container">
      <img src={mapImage} alt="Map" className="map-image" />
      <div className="map-wrapper">
        {entities.map((entity) => (
          <img
            key={entity.id}
            src={entityIcons[entity.type] || dartIcon}
            className="overlay-image"
            style={{
              gridColumn: entity.absoluteCoordinates[0] + 1,
              gridRow: entity.absoluteCoordinates[1] + 1,
            }}
            alt={entity.type}
          />
        ))}
      </div>
      <div className="gray-overlay"></div>
      <div className="message-box">
        <div className="message">
          <div className="message-text">
            testMessage
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
