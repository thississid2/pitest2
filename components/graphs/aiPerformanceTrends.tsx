import React from "react";
import ReactECharts from "echarts-for-react";

const option = {
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    boundaryGap: false,
    axisLine: { show: true },
    axisTick: { show: false },
    axisLabel: { fontSize: 16 },
  },
  yAxis: {
    type: "value",
    axisLine: { show: true },
    axisTick: { show: false },
    axisLabel: { fontSize: 16 },
  },
  grid: {
    left: 70,
    right: 10,
    top: 15,
    bottom: 30,
  },
  series: [
    {
      data: [45000, 52000, 49000, 61000, 58000, 69000, 75000],
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#8884d8",
        width: 2,
      },
      areaStyle: {
        color: "rgba(136, 132, 216, 0.3)",
      },
    },
  ],
};

const AiPerformanceTrends = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ReactECharts option={option} />
    </div>
  );
};

export default AiPerformanceTrends;
