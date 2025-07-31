import { LocalMetrics, FullIncomingData } from "@/types";

/**
 * Extracts key metrics from the incoming WebSocket data.
 * Returns an object with all dashboard metrics.
 */
export function extractMetrics(
  data: FullIncomingData,
  today: Date
): LocalMetrics & { todayTransactions: number } {
  const currentMonth = today.toLocaleString("en-US", { month: "long" });
  const todayIso = today.toISOString().slice(0, 10);

  // Extract daily and hourly
  const hourly = data["fraud-metrics"]?.hourly;
  const daily = data["fraud-metrics"]?.daily;

  // Month-to-date transactions
  let monthToDateTransactions = 0;
  if (daily) {
    monthToDateTransactions = Object.entries(daily).reduce(
      (sum, [key, val]) => {
        if (
          typeof val === "object" &&
          val !== null &&
          "transaction_count" in val &&
          typeof val.transaction_count === "number"
        ) {
          const [month] = key.split(" ");
          if (month === currentMonth) {
            sum += val.transaction_count;
          }
        }
        return sum;
      },
      0
    );
  }

  // Today's transactions (sum hourly if available)
  let todayTotal = 0;
  if (hourly && hourly[todayIso]) {
    todayTotal = Object.values(hourly[todayIso]).reduce((sum, hourObj) => {
      if (
        hourObj &&
        typeof hourObj === "object" &&
        "transaction_count" in hourObj &&
        typeof (hourObj as { transaction_count?: number }).transaction_count ===
          "number"
      ) {
        return (
          sum + (hourObj as { transaction_count: number }).transaction_count
        );
      }
      return sum;
    }, 0);
  }

  // Savings, ROI, recall, fpr from overall
  const overall = data["fraud-metrics"]?.overall;
  const savings = (overall as any)?.savings ?? 0;
  const roi = (overall as any)?.roi ?? 0;
  const recall = (overall as any)?.recall ?? 0;
  const fpr = (overall as any)?.fpr ?? 0;
  // Fraud score from pi-shield
  const fraudScore = data["pi-shield"]?.confidence ?? 0;

  return {
    noOfTransactions: monthToDateTransactions,
    todayTransactions: todayTotal,
    savings,
    roi,
    recall,
    fpr,
    fraudScore,
  };
}
