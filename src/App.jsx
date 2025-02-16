import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import MapComponent from "./components/MapComponent";
import { WEBSOCKET_URL } from "./constants/variables";
import { socket } from "./socket";
import { useCallback, useEffect, useState } from "react";
import { BattlefieldTabs } from "./components/BattlefieldTabs/BattlefieldTabs";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState([]);
  const [entities, setEntities] = useState([]);
  const [isStatusPanelCollapsed, setIsStatusPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  // Keep only the last N events
  const MAX_EVENTS = 50;

  // useCallback to subscribe to a topic
  const subscribe = useCallback((topic) => {
    if (socket.connected) {
      console.log(`Subscribing to ${topic}`);
      socket.emit("subscribe", [topic]);
    }
  }, []);

  // useCallback to unsubscribe from a topic
  const unsubscribe = useCallback(
    (topic) => {
      if (socket?.connected) {
        console.log(`Unsubscribing from ${topic}`);
        socket.emit("unsubscribe", topic);
      }
    },
    [socket]
  );

  // useEffect to handle the socket connection
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

    const addEvent = (type, data) => {
      const event = {
        type,
        data,
        timestamp: data.timestamp || new Date().toISOString(),
        id: Date.now() + Math.random(),
      };
      setEvents((prevEvents) => [event, ...prevEvents].slice(0, MAX_EVENTS));
    };

    const handleLocationChanged = (data) => {
      addEvent("locationChanged", data);
      setEntities((prevEntities) => {
        return prevEntities.map((entity) => {
          if (entity.entityId === data.entityId) {
            return {
              ...entity,
              absoluteCoordinates: data.absoluteCoordinates,
              updatedAt: new Date().toISOString(),
            };
          }
          return entity;
        });
      });
    };


    const handleSpawnEntity = (data) => {
      addEvent("spawnEntity", data);

      const entity = data.entity;
      if (!entity.createdAt || !entity.updatedAt) {
        const now = new Date().toISOString();
        entity.createdAt = entity.createdAt || now;
        entity.updatedAt = entity.updatedAt || now;
      }

      setEntities((prev) => [...prev, entity]);
    };

    const handleDectection = (data) => {
      addEvent("detection", data);

      const entity = data.entity;
      if (!entity.createdAt || !entity.updatedAt) {
        const now = new Date().toISOString();
        entity.createdAt = entity.createdAt || now;
        entity.updatedAt = entity.updatedAt || now;
      }

      setEntities((prev) => [...prev, entity]);
    }
    const eventHandlers = {
      dartStatusUpdate: (data) => addEvent("dartStatusUpdate", data),
      spawnEntity: handleSpawnEntity,
      detection: (data) => handleDectection,
      locationChanged: handleLocationChanged,
      supportNeeded: (data) => addEvent("supportNeeded", data),
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

  // useEffect to fetch the initial state
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await fetch(`${WEBSOCKET_URL}/api/initialState`);
        const data = await response.json();
        console.log("Initial state:", data);

        const now = new Date().toISOString();
        const entitiesWithTimestamps = data.entities.map((entity) => ({
          ...entity,
          createdAt: entity.createdAt || now,
          updatedAt: entity.updatedAt || now,
        }));

        setEntities(entitiesWithTimestamps);
      } catch (error) {
        console.error("Failed to fetch initial state:", error);
      }
    };
    fetchInitialState();
  }, []);

  return (
    <div className="app-container">
      <HeaderComponent isConnected={isConnected} />
      <div className="main-content">
        <div className="map-container">
          <MapComponent entities={entities} />
        </div>
        <div
          className={`status-panel ${
            isStatusPanelCollapsed ? "collapsed" : ""
          }`}
        >
          <div className="status-panel-header">
            <h2>Battlefield Status</h2>
            <button
              className="collapse-button"
              onClick={() => setIsStatusPanelCollapsed(!isStatusPanelCollapsed)}
              aria-label={
                isStatusPanelCollapsed ? "Expand panel" : "Collapse panel"
              }
            >
              {isStatusPanelCollapsed ? "←" : "→"}
            </button>
          </div>
          <div className="status-panel-content">
            <div className="status-item">
              <div className="connection-status">
                <div
                  className={`status-indicator ${
                    isConnected ? "connected" : "disconnected"
                  }`}
                />
                <span>
                  Connection Status:{" "}
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
            <BattlefieldTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              events={events}
              entities={entities}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
