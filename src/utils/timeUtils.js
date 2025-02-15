export function formatPullTime(hour) {
  return `${String(hour).padStart(2, "0")}:00`;
}

/**
 * Formats a timestamp into HH:mm format
 * @param {string|number|Date} timestamp - The timestamp to format
 * @returns {string} Formatted time string in HH:mm format
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formats time to show only the hour in 12-hour format (e.g., "2 AM")
 * @param {string|number|Date} timestamp - The timestamp to format
 * @returns {string} Formatted time string in "h AM/PM" format
 */
export const formatHourOnly = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date
    .toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .toUpperCase();
};
