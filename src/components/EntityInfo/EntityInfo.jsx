import React from "react";
import { DroneInfo } from "./DroneInfo";
import { TankInfo } from "./TankInfo";
import "./EntityInfo.css";

function EntityInfo({ entity, onClose, isClosing }) {
  return (
    <div className={`entity-info-panel ${isClosing ? "sliding-out" : ""}`}>
      <div className="entity-info-header">
        <h3>{entity.type}</h3>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="entity-info-content">
        <div className="info-row">
          <span className="info-label">ID:</span>
          <span className="info-value">{entity.id}</span>
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
