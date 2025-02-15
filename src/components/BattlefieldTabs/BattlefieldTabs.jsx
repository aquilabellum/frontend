import React from "react";
import "./BattlefieldTabs.css";

export function BattlefieldTabs({ activeTab, onTabChange, events, entities }) {
  const getAssetCounts = () => {
    return {
      dataReceiverDrones: entities.filter((e) => e.type === "dataReceiverDrone")
        .length,
      dartDeploymentDrones: entities.filter(
        (e) => e.type === "dartDeploymentDrone"
      ).length,
      darts: entities.filter((e) => e.type === "dart").length,
      tanks: entities.filter((e) => e.type === "tank").length,
      soldiers: entities.filter((e) => e.type === "soldier").length,
    };
  };

  const assetCounts = getAssetCounts();

  return (
    <div className="battlefield-tabs">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === "events" ? "active" : ""}`}
          onClick={() => onTabChange("events")}
        >
          Live Events
        </button>
        <button
          className={`tab-button ${activeTab === "assets" ? "active" : ""}`}
          onClick={() => onTabChange("assets")}
        >
          Assets
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "events" && (
          <div className="events-container">
            {events.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-header">
                  <span className="event-type">{event.type}</span>
                  <span className="event-time">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <pre className="event-data">
                  {JSON.stringify(event.data, null, 2)}
                </pre>
              </div>
            ))}
            {events.length === 0 && (
              <div className="no-events">No events received yet</div>
            )}
          </div>
        )}

        {activeTab === "assets" && (
          <div className="assets-container">
            <div className="asset-item">
              <span className="asset-label">Data Receiver Drones:</span>
              <span className="asset-count">
                {assetCounts.dataReceiverDrones}
              </span>
            </div>
            <div className="asset-item">
              <span className="asset-label">DART Deployment Drones:</span>
              <span className="asset-count">
                {assetCounts.dartDeploymentDrones}
              </span>
            </div>
            <div className="asset-item">
              <span className="asset-label">Deployed DARTs:</span>
              <span className="asset-count">{assetCounts.darts}</span>
            </div>
            <div className="asset-item">
              <span className="asset-label">Enemy Tanks:</span>
              <span className="asset-count threat">{assetCounts.tanks}</span>
            </div>
            <div className="asset-item">
              <span className="asset-label">Friendly Soldiers:</span>
              <span className="asset-count">{assetCounts.soldiers}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
