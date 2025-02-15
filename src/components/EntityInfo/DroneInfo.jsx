import React from "react";
import { BatteryIndicator } from "./BatteryIndicator";
import { PullSchedule } from "./PullSchedule";

export function DroneInfo({ entity, isDartDrone }) {
  // Common drone information
  const commonInfo = (
    <>
      <div className="info-row">
        <span className="info-label">Battery Level:</span>
        <BatteryIndicator level={entity.batteryLevel} />
      </div>
      <div className="info-row">
        <span className="info-label">Last Active:</span>
        <span className="info-value">
          {formatHourOnly(entity.lastActiveTime || new Date())}
        </span>
      </div>
    </>
  );

  if (isDartDrone) {
    return (
      <>
        {commonInfo}
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

  // Get the latest successful pull time - handle both array formats
  const getLastSuccessfulPull = () => {
    if (!entity.pullStatuses) return null;

    // If pullStatuses is an array of booleans
    if (typeof entity.pullStatuses[0] === "boolean") {
      const successIndex = entity.pullStatuses.findIndex((status) => status);
      return successIndex >= 0
        ? {
            hour: entity.pullTimes[successIndex],
            success: true,
            timestamp: new Date().setHours(
              entity.pullTimes[successIndex],
              0,
              0,
              0
            ),
          }
        : null;
    }

    // If pullStatuses is an array of objects
    return entity.pullStatuses
      .filter((status) => status.success)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  };

  const lastSuccessfulPull = getLastSuccessfulPull();

  return (
    <>
      {commonInfo}
      <div className="info-row">
        <span className="info-label">Pulls Per Day:</span>
        <span className="info-value">{pullsPerDay}</span>
      </div>
      <div className="info-row before-section">
        <span className="info-label">Last Successful Pull:</span>
        <span className="info-value">
          {lastSuccessfulPull
            ? formatHourOnly(lastSuccessfulPull.timestamp)
            : "N/A"}
        </span>
      </div>
      <PullSchedule
        pullTimes={sortedPullTimes}
        pullStatuses={entity.pullStatuses || []}
      />
    </>
  );
}

// Helper function to format time as "2 AM" style
const formatHourOnly = (timestamp) => {
  const date = new Date(timestamp);
  return date
    .toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .toUpperCase();
};
