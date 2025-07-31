/**
 * Returns the percent trend (number or undefined) between current and previous values.
 */
export function getTrend(
  current: number,
  previous: number | undefined
): number | undefined {
  if (previous === undefined || previous === 0) return undefined;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

/**
 * Returns color/text/icon for a trend value, with support for goodIfDecrease.
 */
export function getTrendDisplay(
  trend: number | undefined,
  goodIfDecrease: boolean = false
): {
  color: "green" | "red" | "gray";
  text: string;
  icon: "up" | "down" | "none";
} {
  if (trend === undefined) return { color: "gray", text: "0%", icon: "none" };
  if (trend === 0) return { color: "gray", text: "0%", icon: "none" };
  // Icon always matches direction of trend
  const icon = trend > 0 ? "up" : "down";
  // Color is green if the change is good, red if bad
  const isGood =
    (trend < 0 && goodIfDecrease) || (trend > 0 && !goodIfDecrease);
  const color = isGood ? "green" : "red";
  const text = `${trend > 0 ? "+" : "-"}${Math.abs(trend)}%`;
  return { color, text, icon };
}
