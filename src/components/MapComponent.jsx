import mapImage from "../assets/map.png";
import friendlyDrone from "../assets/friendly-drone.png";
import dartIcon from "../assets/dart-icon.svg";
import receiverDroneIcon from "../assets/friendly-drone.png";
import enemyTank from "../assets/enemy-tank.png";
import friendlySoldier from "../assets/friendly-soldier.png";
import { useState } from "react";

import "../styles/map.css";

const entityIcons = {
  dartDeploymentDrone: friendlyDrone,
  dataReceiverDrone: receiverDroneIcon,
  dart: dartIcon,
  tank: enemyTank,
  soldier: friendlySoldier,
};

function EntityInfo({ entity, onClose }) {
  return (
    <div className="entity-info-panel">
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
        {entity.type === "dartDeploymentDrone" && (
          <>
            <div className="info-row">
              <span className="info-label">Mission:</span>
              <span className="info-value">DART Deployment</span>
            </div>
            <div className="info-row">
              <span className="info-label">Payload:</span>
              <span className="info-value">2 DARTs</span>
            </div>
          </>
        )}
        {entity.type === "tank" && (
          <>
            <div className="info-row">
              <span className="info-label">Threat Level:</span>
              <span className="info-value threat-high">High</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Seen:</span>
              <span className="info-value">Just Now</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MapComponent({ entities = [] }) {
  const [selectedEntity, setSelectedEntity] = useState(null);

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
            onClick={() => setSelectedEntity(entity)}
          />
        ))}
      </div>
      <div className="gray-overlay"></div>
      {selectedEntity && (
        <EntityInfo
          entity={selectedEntity}
          onClose={() => setSelectedEntity(null)}
        />
      )}
    </div>
  );
}

export default MapComponent;
