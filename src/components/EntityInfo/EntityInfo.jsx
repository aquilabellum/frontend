import React, { useEffect, useState } from "react";
import { DroneInfo } from "./DroneInfo";
import { TankInfo } from "./TankInfo";
import "./EntityInfo.css";
import { translateEntityTypeToIcon } from "../../utils/translateEntityTypeToIcon";
import { generateSpeech } from "../../utils/textToSpeech";
import { FaVolumeUp } from "react-icons/fa";
import { AudioManager } from "../../utils/audioManager";

function EntityInfo({ entity, onClose, isClosing }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getMissionDescription = (entity) => {
    const descriptions = {
      dataReceiverDrone: `Data Receiver Drone ${
        entity.name
      } is actively collecting battlefield data. Current battery level is ${
        entity.batteryLevel
      }%. This drone performs ${
        entity.pullTimes?.length || 0
      } data pulls per day.`,
      dartDeploymentDrone: `DART Deployment Drone ${entity.name} is responsible for deploying tactical response units. Current battery level is ${entity.batteryLevel}%. This drone carries 2 DARTs ready for deployment.`,
      tank: `Enemy tank detected at coordinates ${entity.absoluteCoordinates.join(
        ", "
      )}. Threat level is high. Continuous monitoring is in progress.`,
      dart: `DART unit ${entity.name} is deployed and operational. Monitoring local area for threats and providing tactical support.`,
      soldier: `Enemy soldier detected at coordinates ${entity.absoluteCoordinates.join(
        ", "
      )}. Maintaining surveillance and tracking movement patterns.`,
    };

    return descriptions[entity.type] || "Unknown entity type detected.";
  };

  const handlePlayVoice = async () => {
    // Don't proceed if any audio is already playing
    if (AudioManager.isPlaying()) {
      return;
    }

    setIsPlaying(true);
    await generateSpeech(getMissionDescription(entity));
    setIsPlaying(false);
  };

  // Update the button's disabled state based on global audio state
  useEffect(() => {
    const checkAudioState = setInterval(() => {
      setIsPlaying(AudioManager.isPlaying());
    }, 100);

    return () => clearInterval(checkAudioState);
  }, []);

  // Helper function to format timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    // hh:mm
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`entity-info-panel ${isClosing ? "sliding-out" : ""}`}>
      <div className="entity-info-header">
        {/* display icon based on entity.type */}
        <img
          src={translateEntityTypeToIcon(entity.type)}
          alt={`${entity.type} icon`}
          style={{ width: "24px", height: "24px" }}
        />
        <h2>{entity.name || "Unknown Entity"}</h2>
        <div className="header-controls">
          <button
            className={`voice-button ${isPlaying ? "playing" : ""}`}
            onClick={handlePlayVoice}
            disabled={isPlaying}
          >
            <FaVolumeUp />
          </button>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
      <div className="entity-info-content">
        <div className="mission-description">
          <p>{getMissionDescription(entity)}</p>
        </div>
        <div className="info-row">
          <span className="info-label">ID:</span>
          <span className="info-value">{entity.entityId}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Position:</span>
          <span className="info-value">
            [{entity.absoluteCoordinates.join(", ")}]
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Status:</span>
          <span className="info-value status-active">Active</span>
        </div>
        <div className="info-row">
          <span className="info-label">Last Status Update at:</span>
          <span className="info-value">
            {formatTimestamp(entity.updatedAt)}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Deployed at:</span>
          <span className="info-value">
            {formatTimestamp(entity.createdAt)}
          </span>
        </div>

        {entity.type === "dataReceiverDrone" && <DroneInfo entity={entity} />}
        {entity.type === "dartDeploymentDrone" && (
          <DroneInfo entity={entity} isDartDrone />
        )}
        {entity.type === "tank" && <TankInfo entity={entity} />}
      </div>
    </div>
  );
}

export default EntityInfo;
