import React from "react";
import { formatPullTime } from "../../utils/timeUtils";
import "./PullSchedule.css";

export function PullSchedule({ pullTimes }) {
  const currentHour = new Date().getHours();

  return (
    <div className="info-section">
      <h4>Daily Schedule</h4>
      <div className="schedule-timeline">
        {Array.from({ length: 24 }, (_, hour) => {
          const isPullTime = pullTimes.includes(hour);
          const isCurrentHour = hour === currentHour;
          return (
            <div
              key={hour}
              className={`timeline-hour ${isPullTime ? "pull-scheduled" : ""} ${
                isCurrentHour ? "current-hour" : ""
              }`}
            >
              <div className="hour-label">{formatPullTime(hour)}</div>
              <div className="hour-marker">
                {isPullTime && <div className="pull-indicator" />}
              </div>
            </div>
          );
        })}
        <div className="timeline-line" />
      </div>

      <div className="scheduled-pulls">
        <h5>Scheduled Pull Times</h5>
        <div className="pull-times-grid">
          {pullTimes.map((hour) => (
            <div
              key={hour}
              className={`pull-time-slot ${
                hour === currentHour ? "current" : ""
              } ${hour < currentHour ? "past" : "upcoming"}`}
            >
              <div className="pull-time-indicator" />
              <span className="pull-time-text">{formatPullTime(hour)}</span>
              {hour === currentHour && (
                <span className="pull-time-status">Current</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
