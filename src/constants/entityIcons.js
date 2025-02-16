import { EntitiesEnum } from "./enums";
import dartDeploymentDroneIcon from "../assets/dart-deployment-drone.png";
import dartIcon from "../assets/dart-icon.svg";
import receiverDroneIcon from "../assets/receiver-drone.png";
import enemyTank from "../assets/enemy-tank.png";
import enemyHelicopter from "../assets/helicopter.png"
// import friendlySoldier from "../assets/friendly-soldier.png";
// import jammerIcon from "../assets/jammer-icon.png";

// Map entity types to their corresponding icon assets
export const entityIcons = {
  [EntitiesEnum.DART_DEPLOYMENT_DRONE]: dartDeploymentDroneIcon,
  [EntitiesEnum.DATA_RECEIVER_DRONE]: receiverDroneIcon,
  [EntitiesEnum.DART]: dartIcon,
  [EntitiesEnum.TANK]: enemyTank,
  [EntitiesEnum.HELICOPTER] : enemyHelicopter
  // [EntitiesEnum.SOLDIER]: friendlySoldier,
  // [EntitiesEnum.JAMMER]: jammerIcon,
};
