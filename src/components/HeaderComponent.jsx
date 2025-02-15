import "../styles/header.css";
import React, { useState, useEffect } from "react";
import { WEBSOCKET_URL } from "../constants/variables";
import { AudioManager } from "../utils/audioManager";

function HeaderComponent({ isConnected }) {
  const [audioData, setAudioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Welcome message explaining the platform
  const welcomeMessage = `Welcome to DART Mission Planner. This platform allows you to monitor drones, track deployments, and manage battlefield assets in real-time. You can view entity locations on the map, check drone schedules, and monitor system status.`;

  useEffect(() => {
    if (audioData) {
      const audio = new Audio(audioData);
      audio.play();
    }
  }, [audioData]);

  const generateSpeech = async (text) => {
    // Don't generate new speech if audio is already playing
    if (AudioManager.isPlaying()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${WEBSOCKET_URL}/api/textToSpeech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate speech");
      }

      const data = await response.json();
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      await AudioManager.play(audio);
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>DART Mission Planner</h1>
        <div className="header-controls">
          <button
            className="guide-button"
            onClick={() => generateSpeech(welcomeMessage)}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "🔊 Platform Guide"}
          </button>
          <div className="connection-status">
            <span
              className={`status-dot ${
                isConnected ? "connected" : "disconnected"
              }`}
            />
            <span className="status-text">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
