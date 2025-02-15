import React from "react";
import { DroneInfo } from "./DroneInfo";
import { TankInfo } from "./TankInfo";
import { InfoRow } from "./InfoRow";
import { AudioButton } from "../common/AudioButton";
import { MissionDescription } from "./MissionDescription";
import "./EntityInfo.css";
import { translateEntityTypeToIcon } from "../../utils/translateEntityTypeToIcon";
import { generateSpeech } from "../../utils/textToSpeech";
import { formatTimestamp } from "../../utils/timeUtils";
import { getMissionDescription } from "../../utils/entityDescriptions";

function EntityInfo({ entity, onClose, isClosing }) {
  const handlePlayVoice = async () => {
    await generateSpeech(getMissionDescription(entity));
  };

  const renderEntitySpecificInfo = () => {
    switch (entity.type) {
      case "dataReceiverDrone":
        return <DroneInfo entity={entity} />;
      case "dartDeploymentDrone":
        return <DroneInfo entity={entity} isDartDrone />;
      case "tank":
        return <TankInfo entity={entity} />;
      default:
        return null;
    }
  };

  return (
    <div className={`entity-info-panel ${isClosing ? "sliding-out" : ""}`}>
      <div className="entity-info-header">
        <img
          src={translateEntityTypeToIcon(entity.type)}
          alt={`${entity.type} icon`}
          style={{ width: "24px", height: "24px" }}
        />
        <h2>{entity.name || "Unknown Entity"}</h2>
        <div className="header-controls">
          <AudioButton onPlay={handlePlayVoice} />
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
      <div className="entity-info-content">
        <MissionDescription entity={entity} />
        <InfoRow label="ID" value={entity.entityId} />
        <InfoRow
          label="Position"
          value={`[${entity.absoluteCoordinates.join(", ")}]`}
        />
        <InfoRow label="Status" value="Active" className="status-active" />
        <InfoRow
          label="Last Status Update at"
          value={formatTimestamp(entity.updatedAt)}
        />
        <InfoRow
          label="Deployed at"
          value={formatTimestamp(entity.createdAt)}
        />
        {renderEntitySpecificInfo()}
      </div>
    </div>
  );
}

export default EntityInfo;
