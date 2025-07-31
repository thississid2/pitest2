import React from "react";
import ReactECharts from "echarts-for-react";

const paymentData = [
  { value: 45, name: "Stripe", itemStyle: { color: "#7573d6" } },
  { value: 30, name: "PayPal", itemStyle: { color: "#74c19c" } },
  { value: 15, name: "Adyen", itemStyle: { color: "#ffc45c" } },
  { value: 10, name: "Square", itemStyle: { color: "#ff6a13" } },
];

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}%",
  },
  legend: {
    orient: "vertical",
    right: 100,
    top: "middle",
    icon: "circle",
    itemGap: 18,
    textStyle: {
      fontSize: 14,
      color: "#1f2937", // Tailwind text-gray-900
      fontWeight: 500,
    },
    formatter: function (name: string) {
      const item = paymentData.find((d) => d.name === name);
      return `${name}    ${item ? item.value + "%" : ""}`;
    },
  },
  series: [
    {
      name: "Payment Methods",
      type: "pie",
      radius: ["45%", "65%"],
      center: ["30%", "50%"], // donut to the left
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      labelLine: {
        show: false,
      },
      data: paymentData,
    },
  ],
};

const PaymentMethodsDoughnutChart = () => {
  return (
    <div className="w-full h-[260px]">
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default PaymentMethodsDoughnutChart;
