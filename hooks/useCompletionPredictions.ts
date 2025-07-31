import { useState, useEffect } from "react";

export interface PredictionData {
  adyen: number[];
  stripe: number[];
  braintree: number[];
  worldpay: number[];
}

/**
 * Custom hook to fetch completion predictions from ML API.
 * Returns loading, error, and prediction data.
 */
export function useCompletionPredictions(view: "Year" | "Month") {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8000/api/completion-predictions?view=${view}`,
          { headers: { Accept: "application/json" } }
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        if (result.success && result.data) {
          setPredictionData(result.data);
        } else {
          throw new Error(result.error || "Failed to get predictions");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, [view]);

  return { predictionData, loading, error };
}
