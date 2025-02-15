export const getMissionDescription = (entity) => {
  const descriptions = {
    dataReceiverDrone: `Data Receiver Drone ${
      entity.name
    } is actively collecting battlefield data. Current battery level is ${
      entity.batteryLevel
    }%. This drone performs ${
      entity.pullTimes?.length || 0
    } data pulls per day.`,
    dartDeploymentDrone: `DART Deployment Drone ${entity.name} is responsible for deploying tactical response units. Current battery level is ${entity.batteryLevel}%. This drone carries 2 DARTs ready for deployment.`,
    tank: `Enemy tank detected at coordinates ${entity.absoluteCoordinates.join(
      ", "
    )}. Threat level is high. Continuous monitoring is in progress.`,
    dart: `DART unit ${entity.name} is deployed and operational. Monitoring local area for threats and providing tactical support.`,
    soldier: `Enemy soldier detected at coordinates ${entity.absoluteCoordinates.join(
      ", "
    )}. Maintaining surveillance and tracking movement patterns.`,
  };

  return descriptions[entity.type] || "Unknown entity type detected.";
};
