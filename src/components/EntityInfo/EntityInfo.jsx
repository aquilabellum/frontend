import React from "react";
import { DroneInfo } from "./DroneInfo";
import { TankInfo } from "./TankInfo";
import "./EntityInfo.css";
import { translateEntityTypeToIcon } from "../../utils/translateEntityTypeToIcon";
// use the entityIcons from translateEntityTypeToIcon map to get the icon for the entity type

function EntityInfo({ entity, onClose, isClosing }) {
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
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="entity-info-content">
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
