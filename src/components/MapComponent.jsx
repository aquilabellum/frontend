import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import mapImage from "../assets/map.png";
import friendlyDrone from "../assets/friendly-drone.png";
import dartIcon from "../assets/dart-icon.svg";
import "../styles/map.css";

function MapComponent() {
  
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    socket.onAny((event, ...args) => {
        console.log(`Received event: ${event}`, args);
        setMessages((prev) => [...prev, { event, data: args }]);
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  const images = [
    { src: friendlyDrone, x: 3, y: 3 },
    { src: dartIcon, x: 5, y: 5 }
  ];

  return (
    <div className="map-container">
      <img src={mapImage} alt="Map" className="map-image" />
      <div className="map-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            className="overlay-image"
            style={{
              gridColumn: image.x,
              gridRow: image.y,
            }}
          />
        ))}
      </div>
      <div className="gray-overlay"></div>
      <div className="message-box">
          <div className="message">
            <div className="message-text">&gt;&gt; testMessage</div>
            <div className="message-date">19:15</div>
          </div>
      </div>
    </div>
  );
}

export default MapComponent;
