import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import MapComponent from "./components/MapComponent";
import { WEBSOCKET_URL } from "./constants";
import { io } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState([]);
  const [entities, setEntities] = useState([]);
  const [isStatusPanelCollapsed, setIsStatusPanelCollapsed] = useState(false);

  // Keep only the last N events
  const MAX_EVENTS = 50;

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

    const addEvent = (type, data) => {
      const event = {
        type,
        data,
        timestamp: new Date().toISOString(),
        id: Date.now() + Math.random(),
      };
      setEvents((prevEvents) => [event, ...prevEvents].slice(0, MAX_EVENTS));
    };

    const handleLocationChanged = (data) => {
      addEvent("locationChanged", data);
      setEntities((prevEntities) => {
        return prevEntities.map((entity) => {
          if (entity.id === data.entity_id) {
            return { ...entity, absoluteCoordinates: data.absoluteCoordinates };
          }
          return entity;
        });
      });
    };

    const handleSpawnEntity = (data) => {
      addEvent("spawnEntity", data);
      setEntities((prev) => [...prev, data]);
    };

    const eventHandlers = {
      dartStatusUpdate: (data) => addEvent("dartStatusUpdate", data),
      spawnEntity: handleSpawnEntity,
      detection: (data) => addEvent("detection", data),
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
            <div className="status-item">
              <h3>Live Events</h3>
              <div className="events-container">
                {events.map((event) => (
                  <div key={event.id} className="event-item">
                    <div className="event-header">
                      <span className="event-type">{event.type}</span>
                      <span className="event-time">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <pre className="event-data">
                      {JSON.stringify(event.data, null, 2)}
                    </pre>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="no-events">No events received yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
