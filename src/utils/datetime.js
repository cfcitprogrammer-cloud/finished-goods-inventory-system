export function getFormattedDateNow() {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now();

  // Create a Date object using the current timestamp
  const date = new Date(timestamp);

  // Format the date to the desired format
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short", // Abbreviated weekday (e.g., "Mon")
    year: "numeric", // Full year (e.g., "2022")
    month: "short", // Abbreviated month (e.g., "Nov")
    day: "numeric", // Day of the month (e.g., "12")
    hour: "2-digit", // Hour in 12-hour format (e.g., "12")
    minute: "2-digit", // Minute (e.g., "00")
    second: "2-digit", // Second (e.g., "00")
    hour12: true, // Use 12-hour clock (AM/PM)
  });

  return formattedDate;
}
