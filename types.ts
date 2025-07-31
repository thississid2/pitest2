/**
 * Metrics for dashboard cards and trends.
 */
export type LocalMetrics = {
  noOfTransactions: number;
  savings: number;
  roi: number;
  recall: number;
  fpr: number;
  fraudScore: number;
};

/**
 * Metrics for fraud detection (recall, fnr, fpr).
 */
export type Metrics = {
  recall: number;
  fnr: number;
  fpr: number;
};

/**
 * Data for a single day (used in tables).
 */
export type DayData = {
  date: string;
  transactions: number[]; // always 25
  frauds: number[];
};

/**
 * Full incoming data from backend (WebSocket response).
 */
export type FullIncomingData = {
  "fraud-metrics"?: {
    overall?: Metrics;
    hourly?: Record<string, HourBucket>;
    daily?: Record<string, DailyBucket | "-">;
  };
  "pi-shield"?: {
    actual?: string;
    recommendation?: string;
    fraud_score?: number;
    risk_level?: string;
    confidence?: number;
  };
};

/**
 * Data for a single hour (used in hourly metrics).
 */
export type HourBucket = {
  transaction_count?: number;
  fraud_count?: number;
};

/**
 * Data for a single day (used in daily metrics).
 */
export type DailyBucket = {
  transaction_count: number;
  fraud_count: number;
  fraud_to_sales_ratio: number;
};
