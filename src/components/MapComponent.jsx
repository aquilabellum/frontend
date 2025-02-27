import React, { useState } from "react";
import mapImage from "../assets/map.png";
import { entityIcons } from "../constants/entityIcons";
import EntityInfo from "./EntityInfo/EntityInfo";
import "../styles/map.css";

function MapComponent({ entities = [] }) {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleMapClick = (e) => {
    if (
      e.target.classList.contains("map-container") ||
      e.target.classList.contains("gray-overlay") ||
      e.target.classList.contains("map-image")
    ) {
      setIsClosing(true);
      setTimeout(() => {
        setSelectedEntity(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const handleEntityClick = (entity, e) => {
    e.stopPropagation();
    setSelectedEntity(entity);
    setIsClosing(false);
  };

  return (
    <div className="map-container" onClick={handleMapClick}>
      <img src={mapImage} alt="Map" className="map-image" />
      <div>
        {entities.map((entity) => (
          <img
            key={entity.entityId}
            src={entityIcons[entity.type]}
            className="overlay-image"
            style={{
              position: "absolute",
              left: `${((entity.absoluteCoordinates[0] - 0) / (600 - 100)) * 100}%`,
              bottom: `${((entity.absoluteCoordinates[1] - 0) / (300 - 100)) * 100}%`,
            transform: "translate(-50%, 50%)",
            }}
            alt={entity.type}
            onClick={(e) => handleEntityClick(entity, e)}
          />
        ))}
      </div>
      <div className="gray-overlay"></div>
      {selectedEntity && (
        <EntityInfo
          entity={selectedEntity}
          onClose={() => {
            setIsClosing(true);
            setTimeout(() => {
              setSelectedEntity(null);
              setIsClosing(false);
            }, 300);
          }}
          isClosing={isClosing}
        />
      )}
    </div>
  );
}

export default MapComponent;
