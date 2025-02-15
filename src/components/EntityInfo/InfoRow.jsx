import React from "react";

export function InfoRow({ label, value, className = "" }) {
  return (
    <div className={`info-row ${className}`}>
      <span className="info-label">{label}</span>
      <span className={`info-value ${className}`}>{value}</span>
    </div>
  );
}
