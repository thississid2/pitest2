import React from "react";
import ReactECharts from "echarts-for-react";

const option = {
  xAxis: {
    type: "category",
    data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    axisLabel: { fontSize: 16 },
    axisLine: { show: true },
    axisTick: { show: false },
  },
  yAxis: [
    {
      type: "value",
      axisLabel: { fontSize: 16 },
      axisLine: { show: true },
      axisTick: { show: false },
      min: 0,
      max: 240,
      splitLine: {show: false}
    },
    {
      type: "value",
      axisLabel: { fontSize: 16 },
      axisLine: { show: true },
      axisTick: { show: false },
      min: 0,
      max: 14000,
    },
  ],
  grid: {
    left: 70,
    right: 70,
    top: 15,
    bottom: 30,
  },
  series: [
    {
      name: "Series 1",
      data: [50, 20, 70, 150, 210, 160, 60],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: {
        color: "#6c63ff",
        width: 2,
      },
      itemStyle: {
        color: "#6c63ff",
        borderColor: "#fff",
        borderWidth: 2,
      },
      yAxisIndex: 0,
    },
    {
      name: "Series 2",
      data: [40, 15, 60, 130, 190, 140, 55],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: {
        color: "#43b581",
        width: 2,
      },
      itemStyle: {
        color: "#43b581",
        borderColor: "#fff",
        borderWidth: 2,
      },
      yAxisIndex: 1,
    },
  ],
};

const RealTimeChart = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ReactECharts option={option}/>
    </div>
  );
};

export default RealTimeChart;
