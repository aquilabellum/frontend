import mapImage from "../assets/map.png";
import "../styles/map.css";

function MapComponent() {
    return (
        <div className="map-container">
            <img src={mapImage} alt="Map" className="map-image" />
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
