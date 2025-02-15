import "../styles/header.css";
import React, { useState } from "react";
import { AudioButton } from "./common/AudioButton";
import { generateSpeech } from "../utils/textToSpeech";
import { WELCOME_MESSAGE } from "../constants/messages";

function HeaderComponent({ isConnected }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGuidePlay = async () => {
    setIsLoading(true);
    try {
      await generateSpeech(WELCOME_MESSAGE);
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
            onClick={handleGuidePlay}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "🔊 Platform Guide"}
          </button>
          <ConnectionStatus isConnected={isConnected} />
        </div>
      </div>
    </header>
  );
}

function ConnectionStatus({ isConnected }) {
  return (
    <div className="connection-status">
      <span
        className={`status-dot ${isConnected ? "connected" : "disconnected"}`}
      />
      <span className="status-text">
        {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
}

export default HeaderComponent;
