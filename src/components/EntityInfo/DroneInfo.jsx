import React from "react";
import { BatteryIndicator } from "./BatteryIndicator";
import { PullSchedule } from "./PullSchedule";

export function DroneInfo({ entity, isDartDrone }) {
  if (isDartDrone) {
    return (
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
    );
  }

  const sortedPullTimes = entity.pullTimes
    ? [...entity.pullTimes].sort((a, b) => a - b)
    : [];
  const pullsPerDay = sortedPullTimes.length;

  return (
    <>
      <div className="info-row">
        <span className="info-label">Battery Level:</span>
        <BatteryIndicator level={entity.batteryLevel} />
      </div>
      <div className="info-row">
        <span className="info-label">Pulls Per Day:</span>
        <span className="info-value">{pullsPerDay}</span>
      </div>
      <div className="info-row before-section">
        <span className="info-label">Last Pull:</span>
        <span className="info-value">
          {entity.lastPullTime
            ? new Date(entity.lastPullTime).toLocaleTimeString()
            : "N/A"}
        </span>
      </div>
      <PullSchedule pullTimes={sortedPullTimes} />
    </>
  );
}
