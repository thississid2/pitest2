import React from "react";
import ReactECharts from "echarts-for-react";

const hours = ["00", "04", "08", "12", "16", "20"];
const values = [120, 80, 300, 400, 350, 270];

const option = {
  grid: {
    left: 20,
    right: 20,
    top: 10,
    bottom: 30,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: hours,
    axisLine: { show: true, lineStyle: { color: "#333" } },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 18,
      color: "#444",
      fontWeight: 500,
      margin: 10,
    },
  },
  yAxis: {
    type: "value",
    splitLine: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
  },
  series: [
    {
      data: values,
      type: "bar",
      barWidth: 40,
      itemStyle: {
        color: "#7569d1",
        borderRadius: [4, 4, 0, 0],
      },
    },
  ],
};

const TodayActivityBarGraph = () => {
  return (
    <ReactECharts option={option} style={{ height: 120, width: "100%" }} />
  );
};

export default TodayActivityBarGraph;
