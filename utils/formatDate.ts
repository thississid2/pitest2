/**
 * Formats a date string for table display, depending on view type.
 */
export function formatDateString(
  dateStr: string,
  view: "Time" | "Date"
): string {
  const date = new Date(dateStr);
  return view === "Date"
    ? date.toLocaleDateString("en-US", { day: "2-digit", month: "short" }) // "04 Jul"
    : dateStr; // "2025-07-04"
}
