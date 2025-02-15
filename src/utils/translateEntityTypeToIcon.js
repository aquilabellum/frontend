import { entityIcons } from "../constants/entityIcons";

export const translateEntityTypeToIcon = (entityType) => {
  return entityIcons[entityType];
};
