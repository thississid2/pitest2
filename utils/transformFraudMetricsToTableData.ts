/**
 * Transforms backend fraud metrics into DayData[] for table display.
 */
import { DayData } from "../types";
export function transformFraudMetricsToTableData(
  fraudMetrics: any,
  view: "Time" | "Date"
): DayData[] {
  // ...existing code...
  if (!fraudMetrics) return [];
  if (view === "Time" && fraudMetrics.hourly) {
    // Assume today for all hourly data
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const transactions: number[] = [];
    const frauds: number[] = [];
    for (let i = 0; i < 24; i++) {
      const hourData =
        fraudMetrics.hourly[i]?.transaction_count !== undefined
          ? fraudMetrics.hourly[i]
          : {};
      transactions[i] = hourData.transaction_count || 0;
      frauds[i] = hourData.fraud_count || 0;
    }
    return [{ date: dateStr, transactions, frauds }];
  }
  if (view === "Date" && fraudMetrics.daily) {
    // Each key is a day label, value is an object or "-"
    return Object.entries(fraudMetrics.daily)
      .filter(([_, v]) => v && v !== "-")
      .map(([label, v]: [string, any]) => {
        // Try to parse date from label, fallback to label
        let dateStr = label;
        const d = Date.parse(label + ", 2025");
        if (!isNaN(d)) dateStr = new Date(d).toISOString().slice(0, 10);
        return {
          date: dateStr,
          transactions: [v.transaction_count || 0],
          frauds: [v.fraud_count || 0],
        };
      });
  }
  return [];
}
