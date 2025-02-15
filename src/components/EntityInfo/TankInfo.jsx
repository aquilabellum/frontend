import React from "react";

export function TankInfo({ entity }) {
  return (
    <>
      <div className="info-row">
        <span className="info-label">Threat Level:</span>
        <span className="info-value threat-high">High</span>
      </div>
      <div className="info-row">
        <span className="info-label">Last Seen:</span>
        <span className="info-value">Just Now</span>
      </div>
    </>
  );
}
