import React from "react";
import { getMissionDescription } from "../../utils/entityDescriptions";

export function MissionDescription({ entity }) {
  return (
    <div className="mission-description">
      <p>{getMissionDescription(entity)}</p>
    </div>
  );
}
