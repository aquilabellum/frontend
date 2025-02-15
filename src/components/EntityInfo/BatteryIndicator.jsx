import React from "react";
import "./BatteryIndicator.css";

function getBatteryColor(level) {
  if (level >= 70) return "#4caf50";
  if (level >= 30) return "#ffa726";
  return "#f44336";
}

export function BatteryIndicator({ level = 100 }) {
  return (
    <div className="battery-indicator">
      <div
        className="battery-level"
        style={{
          width: `${level}%`,
          backgroundColor: getBatteryColor(level),
        }}
      />
      <span className="battery-text">{level}%</span>
    </div>
  );
}
