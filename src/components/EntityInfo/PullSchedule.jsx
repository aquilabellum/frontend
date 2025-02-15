import React from "react";
import {
  BsCheck2Circle, // Changed to a more visible checkmark
  BsXCircleFill,
  BsClock,
  BsCircle, // Added for pending state
} from "react-icons/bs";
import "./PullSchedule.css";

// Helper function to format hour as "2 AM" style
const formatPullTime = (hour) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date
    .toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .toUpperCase();
};

export function PullSchedule({ pullTimes, pullStatuses = [] }) {
  const currentHour = new Date().getHours();

  // Convert pullStatuses array to a map for easier lookup
  const statusMap = pullTimes.reduce((acc, hour, index) => {
    // Handle both boolean array and object array formats
    if (typeof pullStatuses[index] === "boolean") {
      acc[hour] = pullStatuses[index];
    } else if (pullStatuses[index]?.success !== undefined) {
      acc[hour] = pullStatuses[index].success;
    }
    return acc;
  }, {});

  const StatusIcon = ({ status }) => {
    if (status === undefined) {
      return (
        <div className="status-icon-container pending">
          <BsCircle className="status-icon-bg" />
          <BsClock className="status-icon" />
        </div>
      );
    }
    return status ? (
      <div className="status-icon-container success">
        <BsCircle className="status-icon-bg" />
        <BsCheck2Circle className="status-icon" />
      </div>
    ) : (
      <div className="status-icon-container failure">
        <BsCircle className="status-icon-bg" />
        <BsXCircleFill className="status-icon" />
      </div>
    );
  };

  return (
    <div className="info-section">
      <h4>Daily Schedule</h4>
      <div className="schedule-timeline">
        {Array.from({ length: 24 }, (_, hour) => {
          const isPullTime = pullTimes.includes(hour);
          const isCurrentHour = hour === currentHour;
          const status = statusMap[hour];
          const isPast = hour < currentHour;

          return (
            <div
              key={hour}
              className={`timeline-hour ${isPullTime ? "pull-scheduled" : ""} ${
                isCurrentHour ? "current-hour" : ""
              } ${isPast ? "past" : ""}`}
            >
              <div className="hour-label">{formatPullTime(hour)}</div>
              <div className="hour-marker">
                {isPullTime && (
                  <div className="pull-indicator">
                    <StatusIcon status={status} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="timeline-line" />
      </div>

      <div className="scheduled-pulls">
        <h5>Scheduled Pull Times</h5>
        <div className="pull-times-grid">
          {pullTimes.map((hour) => {
            const status = statusMap[hour];
            return (
              <div
                key={hour}
                className={`pull-time-slot ${
                  hour === currentHour ? "current" : ""
                } ${hour < currentHour ? "past" : "upcoming"}`}
              >
                <div className="pull-time-indicator">
                  <StatusIcon status={status} />
                </div>
                <span className="pull-time-text">{formatPullTime(hour)}</span>
                {hour === currentHour && (
                  <span className="pull-time-status">Current</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
