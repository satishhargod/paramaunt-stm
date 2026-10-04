export default function formatTime(time) {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);

  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 || 12;

  return `${formattedHour}:${minutes} ${ampm}`;
}