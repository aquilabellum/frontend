import React, { useState } from "react";
import mapImage from "../assets/map.png";
import { entityIcons } from "../constants/entityIcons";
import EntityInfo from "./EntityInfo/EntityInfo";
import { EntitiesEnum } from "../constants/enums";
import { socket } from "../socket";
import "../styles/map.css";

function MapComponent({ entities = [] }) {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [plannedDarts, setPlannedDarts] = useState([]);

  const handleMapClick = (e) => {
    if (
      e.target.classList.contains("map-container") ||
      e.target.classList.contains("map-image")
    ) {
      // Get click coordinates relative to map
      const rect = e.target.getBoundingClientRect();
      // Calculate coordinates as percentage of map dimensions
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 600);
      const y = Math.round(
        ((rect.height - (e.clientY - rect.top)) / rect.height) * 300
      );

      // Create new planned DART
      const newDart = {
        entityId: `planned-dart-${Date.now()}`,
        type: EntitiesEnum.DART,
        status: "upToBePlanted",
        absoluteCoordinates: [x, y, 0],
        name: `Planned DART ${plannedDarts.length + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("New DART coordinates:", x, y); // For debugging

      // Add to local state
      setPlannedDarts((prev) => [...prev, newDart]);

      // Emit event to backend with topicName
      socket.emit("spawnEntity", {
        topicName: "spawnEntity",
        eventId: `spawn-${Date.now()}`,
        entity: newDart,
        timestamp: new Date().toISOString(),
      });

      setSelectedEntity(null);
      setIsClosing(false);
    }
  };

  const handleEntityClick = (entity, e) => {
    e.stopPropagation();
    setSelectedEntity(entity);
    setIsClosing(false);
  };

  // Combine actual entities with planned darts
  const allEntities = [...entities, ...plannedDarts];

  return (
    <div className="map-container" onClick={handleMapClick}>
      <img src={mapImage} alt="Map" className="map-image" />
      <div>
        {allEntities.map((entity) => (
          <img
            key={entity.entityId}
            src={entityIcons[entity.type]}
            className={`overlay-image ${
              entity.status === "upToBePlanted" ? "planned" : ""
            }`}
            style={{
              position: "absolute",
              left: `${(entity.absoluteCoordinates[0] / 500) * 100}%`,
              bottom: `${(entity.absoluteCoordinates[1] / 281) * 100}%`,
              transform: "translate(-50%, 50%)",
              opacity: entity.status === "upToBePlanted" ? 0.5 : 1,
            }}
            alt={entity.type}
            onClick={(e) => handleEntityClick(entity, e)}
          />
        ))}
      </div>
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
