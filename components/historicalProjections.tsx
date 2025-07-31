"use client";

// ...existing code...
import ReactECharts from "echarts-for-react";
import { useCompletionPredictions } from "@/hooks/useCompletionPredictions";

interface LinechartProps {
  data?: {
    adyen: number[];
    stripe: number[];
    braintree: number[];
    worldpay: number[];
    aib?: number[];
    barclays?: number[];
  };
}

// Removed unused type PredictionData

const HistoricalProjections = ({ data: projectionData }: LinechartProps) => {
  // Removed unused variable collapsed
  const { predictionData, loading, error } = useCompletionPredictions("Year");
  const acquirers = [
    "adyen",
    "stripe",
    "braintree",
    "worldpay",
    "aib",
    "barclays",
  ];
  const acquirerLabels: Record<string, string> = {
    adyen: "Adyen",
    stripe: "Stripe",
    braintree: "Braintree",
    worldpay: "Worldpay",
    aib: "AIB",
    barclays: "Barclays",
  };
  // Month labels for chart, only up to current month
  const allLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based
  const labels = allLabels.slice(0, currentMonth + 1);

  // Defensive fallback and normalization for chartData
  const fallbackData = {
    adyen: Array(labels.length).fill(86),
    stripe: Array(labels.length).fill(89),
    braintree: Array(labels.length).fill(87),
    worldpay: Array(labels.length).fill(82),
    aib: Array(labels.length).fill(80),
    barclays: Array(labels.length).fill(85),
  };
  const rawData = (predictionData || projectionData || fallbackData) as Record<
    string,
    number[]
  >;
  // Truncate each acquirer data to current month
  const chartData: Record<string, number[]> = Object.fromEntries(
    acquirers.map((key) => [
      key,
      Array.isArray(rawData[key])
        ? rawData[key].slice(0, labels.length)
        : Array(labels.length).fill(0),
    ])
  );

  const colors = [
    "#FF6384", // Adyen
    "#36A2EB", // Stripe
    "#FFCE56", // Braintree
    "#4BC0C0", // Worldpay
    "#8E44AD", // AIB
    "#2ECC71", // Barclays
  ];

  // Replace 'any' with Record<string, unknown> for echartsOption
  const echartsOption: Record<string, unknown> = {
    title: {
      text: loading
        ? "Loading ML Predictions..."
        : error
        ? "Using Fallback Data (API Error)"
        : "",
      left: "center",
      top: 10,
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: "axis",
      formatter: (
        params: Array<{
          axisValue: string;
          marker: string;
          seriesName: string;
          data: number;
        }>
      ) => {
        let str = `${params[0].axisValue}<br/>`;
        params.forEach((item) => {
          str += `${item.marker} ${item.seriesName}: ${item.data}%<br/>`;
        });
        return str;
      },
    },
    legend: {
      data: acquirers.map((a: string) => acquirerLabels[a]),
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
      name: "Month",
      nameLocation: "center",
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: {
        formatter: "{value}%",
      },
    },
    series: acquirers.map((acquirer, idx) => ({
      name: acquirerLabels[acquirer],
      type: "line",
      stack: "Total",
      data: chartData[acquirer],
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        color: colors[idx % colors.length],
        width: 2,
      },
      itemStyle: {
        color: colors[idx % colors.length],
      },
    })),
  };

  return (
    <div className="w-full h-auto mt-5 flex justify-center">
      <div className="w-full max-w-7xl">
        {error && (
          <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
            ⚠️ ML API Error: {error}. Using fallback data.
          </div>
        )}
        <ReactECharts
          option={echartsOption}
          style={{ height: "350px", width: "100%" }}
        />
      </div>
    </div>
  );
};
export default HistoricalProjections;
