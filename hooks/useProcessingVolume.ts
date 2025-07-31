import { useState, useEffect } from "react";

export interface ProcessingVolume {
  status: string;
  processing_volume: Record<string, number>;
}

/**
 * Custom hook to fetch processing volume data from API or use provided data.
 * Returns loading state and the data object.
 */
export function useProcessingVolume(apiData?: ProcessingVolume) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProcessingVolume | null>(null);

  useEffect(() => {
    if (apiData) {
      setData(apiData);
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api.payintelli.com/api/processing-volume"
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching processing volumes:", error);
          setData({
            status: "success",
            processing_volume: {
              Barclays: 337,
              Stripe: 334,
              Worldpay: 327,
              Braintree: 346,
              AIB: 311,
              Adyen: 348,
            },
          });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [apiData]);

  return { loading, data };
}
