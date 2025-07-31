import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const sampleData = [
  { month: "Jan", value: 240000, transactions: 1200 },
  { month: "Feb", value: 180000, transactions: 950 },
  { month: "Mar", value: 310000, transactions: 1600 },
  { month: "Apr", value: 290000, transactions: 1500 },
  { month: "May", value: 350000, transactions: 1800 },
  { month: "Jun", value: 330000, transactions: 1700 },
  { month: "Jul", value: 420000, transactions: 2100 },
];

const TransactionsTrends = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    chart.setOption({
      xAxis: {
        type: "category",
        data: sampleData.map((d) => d.month),
        boundaryGap: false,
        axisLine: { lineStyle: { color: "#888" } },
        axisTick: { show: false },
        axisLabel: { fontSize: 16, color: "#444" },
      },
      yAxis: {
        type: "value",
        name: "Revenue / Transactions",
        axisLine: { show: true, lineStyle: { color: "#888" } },
        axisLabel: { fontSize: 16, color: "#444" },
        splitLine: { lineStyle: { color: "#ddd", type: "dashed" } },
      },
      grid: {
        left: 70,
        right: 10,
        top: 15,
        bottom: 30,
      },
      series: [
        {
          name: "Revenue",
          type: "line",
          data: sampleData.map((d) => d.value),
          areaStyle: {
            color: "rgba(100, 100, 200, 0.3)",
          },
          lineStyle: {
            color: "rgba(100, 100, 200, 0.7)",
            width: 2,
          },
          symbol: "none",
        },
        {
          name: "Transactions",
          type: "line",
          data: sampleData.map((d) => d.transactions),
          areaStyle: {
            color: "rgba(0, 200, 100, 0.18)",
          },
          lineStyle: {
            color: "rgba(0, 200, 100, 0.7)",
            width: 2,
          },
          symbol: "none",
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderColor: "#888",
        borderWidth: 1,
        textStyle: { color: "#222" },
      },
    });
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "320px" }}
      aria-label="Transactions Trends Area Chart"
    />
  );
};

export default TransactionsTrends;
