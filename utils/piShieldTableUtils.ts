import { DayData } from "@/types";

/**
 * Returns totals for a given day: transactions, frauds, and fraud ratio.
 */
export function getTotalsForDate(day: DayData) {
  const txns = day.transactions.reduce((a, b) => a + b, 0);
  const frds = day.frauds.reduce((a, b) => a + b, 0);
  const ratio = txns === 0 ? "0%" : `${((frds / txns) * 100).toFixed(1)}%`;
  return { txns, frds, ratio };
}

/**
 * Groups DayData by month label (e.g., "July 2025").
 */
export function groupByMonth(data: DayData[]) {
  return data.reduce((acc, day) => {
    const d = new Date(day.date);
    const monthLabel = d.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthLabel]) acc[monthLabel] = [];
    acc[monthLabel].push(day);
    return acc;
  }, {} as Record<string, DayData[]>);
}

/**
 * Returns the latest hour for the table (for today, use current hour; else 23).
 */
export function getLatestHour(data: DayData[], view: "Time" | "Date") {
  if (view !== "Time") return 24;
  return Math.max(
    ...data.map((day) => {
      const isToday =
        new Date(day.date).toDateString() === new Date().toDateString();
      return isToday ? new Date().getHours() : 23;
    })
  );
}

/**
 * Returns array of table cells for a given hour and type (txn, fraud, ratio).
 */
export function renderHourCells(
  day: DayData,
  latestHour: number,
  type: "txn" | "fraud" | "ratio"
) {
  const is01 = new Date(day.date).getDate() === 1;
  return Array.from({ length: latestHour + 1 })
    .map((_, i) => latestHour - i)
    .map((hour) => {
      const t = day.transactions[hour] ?? 0;
      const f = day.frauds[hour] ?? 0;
      const val =
        type === "txn"
          ? t
          : type === "fraud"
          ? f
          : t === 0
          ? "0%"
          : `${((f / t) * 100).toFixed(1)}%`;
      return { val, hour, isBorder: is01 && hour === 0 };
    });
}
