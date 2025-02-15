import mapImage from "../assets/map.png";
import friendlyDrone from "../assets/friendly-drone.png";
import dartIcon from "../assets/dart-icon.svg";
import receiverDroneIcon from "../assets/friendly-drone.png";
import enemyTank from "../assets/enemy-tank.png";
import friendlySoldier from "../assets/friendly-soldier.png";

import "../styles/map.css";

const entityIcons = {
  dartDeploymentDrone: friendlyDrone,
  dataReceiverDrone: receiverDroneIcon,
  dart: dartIcon,
  tank: enemyTank,
  soldier: friendlySoldier,
};

function MapComponent({ entities = [] }) {
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
          />
        ))}
      </div>
      <div className="gray-overlay"></div>
    </div>
  );
}

export default MapComponent;
