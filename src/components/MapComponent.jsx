import mapImage from "../assets/map.png";
import friendlySoldier from "../assets/friendly-soldier.png";
import "../styles/map.css";

function MapComponent() {
  const images = [
    { src: friendlySoldier, x: 3, y: 3 },
    { src: friendlySoldier, x: 5, y: 4 },
  ];
  return (
    <div className="map-container">
      <img src={mapImage} alt="Map" className="map-image" />
      <div className="map-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            className="overlay-image"
            style={{
              gridColumn: image.x,
              gridRow: image.y,
            }}
          />
        ))}
      </div>
      <div class="gray-overlay"></div>

      <div className="message-box">
        <div className="message">
          <div className="message-text"> &gt;&gt; test Message at xyz</div>
          <div className="message-date"> 19:15</div>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
