// /utils/transformDailyMetricsToTableData.ts

import { DayData, DailyBucket } from "@/types";

export function transformDailyMetricsToTableData(
  daily: Record<string, DailyBucket | "-">
): DayData[] {
  const result: DayData[] = [];

  Object.entries(daily).forEach(([label, data]) => {
    if (data === "-" || !data) return;

    // const parsedDate = new Date(`${label}, 2025`);
    const date = new Date(`2025-${label}`).toISOString().split("T")[0];

    const transactions = Array(25).fill(0);
    const frauds = Array(25).fill(0);
    transactions[24] = data.transaction_count ?? 0;
    frauds[24] = data.fraud_count ?? 0;

    result.push({ date, transactions, frauds });
  });

  return result;
}
