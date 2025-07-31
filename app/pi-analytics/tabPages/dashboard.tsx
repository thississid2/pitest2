import React, { useState } from "react";
import Card from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  Target,
  Brain,
  Sparkles,
  Calendar,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

// Type for AI Insights modal
type AIInsight = {
  title: string;
  insights: string[];
  recommendation: string;
};

const Dashboard = () => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(
    "MTD"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showCustomDatePicker, setShowCustomDatePicker] =
    useState<boolean>(false);
  const [customStartDate, setCustomStartDate] = useState<string | null>(null);
  const [customEndDate, setCustomEndDate] = useState<string | null>(null);

  // Date filter options
  const dateFilters = [
    { value: "today", label: "Today", range: "July 29, 2025" },
    { value: "yesterday", label: "Yesterday", range: "July 28, 2025" },
    { value: "weekly", label: "Last 7 Days", range: "July 23 - July 29, 2025" },
    { value: "MTD", label: "Month to Date", range: "July 1 - July 29, 2025" },
    { value: "YTD", label: "Year to Date", range: "Jan 1 - July 29, 2025" },
    { value: "custom", label: "Custom Range", range: "Select dates..." },
  ];

  const getSelectedFilter = () => {
    const filter = dateFilters.find((f) => f.value === selectedDateFilter);
    if (selectedDateFilter === "custom" && customStartDate && customEndDate) {
      return {
        ...filter,
        label: "Custom Range",
        range: `${customStartDate} - ${customEndDate}`,
      };
    }
    return filter;
  };

  const handleCustomDateSelect = () => {
    setIsDropdownOpen(false);
    setShowCustomDatePicker(true);
  };

  const applyCustomDateRange = () => {
    if (customStartDate && customEndDate) {
      setSelectedDateFilter("custom");
      setShowCustomDatePicker(false);
    }
  };

  const cancelCustomDateRange = () => {
    setShowCustomDatePicker(false);
    setCustomStartDate(null);
    setCustomEndDate(null);
  };
  const trends = {
    totalTransactionVolume: 15.3,
    avgTransactionValue: 8.7,
    processingPartners: 12.1,
    paymentMethods: -2.4,
    geographicRegions: 6.8,
    fraudRate: -18.9,
    fraudLoss: -25.2,
  };

  // Chart colors
  const chartColors = ['#76B4E0', '#7976CA', '#ED996C', '#76B4E0', '#7976CA'];

  // AI Insights data
  const aiInsights = {
    revenueByCurrency: {
      title: "Revenue Distribution Analysis",
      insights: [
        "USD dominates revenue at 41.2%, indicating strong North American market presence",
        "EUR represents 29.5% of revenue, showing significant European expansion opportunity",
        "Combined USD and EUR account for 70.7% of total revenue, suggesting concentrated market focus",
        "Emerging markets (Others) contribute 5.9% - potential for growth diversification",
        "Currency hedging recommended for EUR exposure given current volatility",
      ],
      recommendation:
        "Consider expanding marketing efforts in EUR markets while monitoring currency exchange risks. Diversify into emerging markets for revenue stability.",
    },
    top5Acquirers: {
      title: "Acquirer Performance Analysis",
      insights: [
        "Stripe leads with 1.2M transactions (32.5%), showing strong digital payment adoption",
        "PayPal follows with 892K transactions, indicating customer preference for trusted brands",
        "Square and Adyen show healthy competition in mid-tier volume range",
        "Top 3 acquirers handle 75% of total volume, creating potential concentration risk",
        "Worldpay's 523K transactions suggest room for partnership expansion",
      ],
      recommendation:
        "Diversify acquirer portfolio to reduce dependency risk. Consider performance-based incentives for underperforming partners and explore new acquirer relationships.",
    },
    paymentMethods: {
      title: "Payment Method Trends Analysis",
      insights: [
        "Credit cards dominate at 42.5%, reflecting traditional payment preferences",
        "Debit cards at 28.3% show strong preference for immediate payment settlement",
        "Digital wallets (15.7%) indicate growing mobile payment adoption",
        "Crypto payments (3.2%) show early adoption but significant growth potential",
        "Bank transfers (8.9%) suggest B2B transaction preference",
      ],
      recommendation:
        "Invest in digital wallet infrastructure and crypto payment capabilities. Monitor declining traditional payment methods and prepare for mobile-first future.",
    },
  };

  // AI Insight Component
  const AIInsightModal = ({ insights, trigger }: { insights: AIInsight, trigger: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            {insights.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Key Insights
            </h4>
            <ul className="space-y-2">
              {insights.insights.map((insight: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              AI Recommendation
            </h4>
            <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              {insights.recommendation}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Revenue by Currency Pie Chart
  const revenueByCurrencyOption = {
    title: {
      text: "Revenue by Currency",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: ${c}M ({d}%)",
    },
    series: [
      {
        name: "Revenue",
        type: "pie",
        radius: ["35%", "70%"],
        center: ["50%", "55%"],
        data: [
          { value: 1247, name: "USD" },
          { value: 892, name: "EUR" },
          { value: 456, name: "GBP" },
          { value: 234, name: "CAD" },
          { value: 178, name: "Others" },
        ],
        label: {
          show: true,
          position: "outside",
          formatter: "{b}",
          fontSize: 11,
          fontWeight: "normal",
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 8,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          color: function(params: { dataIndex: number }) {
            return chartColors[params.dataIndex % chartColors.length];
          },
        },
      },
    ],
  };

  // Top 5 Acquirers by Volume Bar Chart
  const top5AcquirersOption = {
    title: {
      text: "Top 5 Acquirers by Volume",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: "{b}: {c}K transactions",
    },
    grid: {
      left: "8%",
      right: "4%",
      bottom: "22%",
      top: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Stripe", "PayPal", "Square", "Adyen", "Worldpay"],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        margin: 10,
      },
    },
    yAxis: {
      type: "value",
      name: "Volume (K)",
      nameLocation: "middle",
      nameGap: 25,
      nameTextStyle: {
        fontSize: 11,
      },
    },
    series: [
      {
        name: "Transaction Volume",
        type: "bar",
        barWidth: "60%",
        data: [1247, 892, 756, 634, 523],
        itemStyle: {
          color: function(params: { dataIndex: number }) {
            return chartColors[params.dataIndex % chartColors.length];
          },
        },
      },
    ],
  };

  // Payment Method Distribution Bar Chart
  const paymentMethodOption = {
    title: {
      text: "Payment Method Distribution",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: "{b}: {c}%",
    },
    grid: {
      left: "8%",
      right: "4%",
      bottom: "18%",
      top: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Credit Card",
        "Debit Card",
        "Digital Wallet",
        "Bank Transfer",
        "Crypto",
        "Others",
      ],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        margin: 8,
      },
    },
    yAxis: {
      type: "value",
      name: "Percentage (%)",
      nameLocation: "middle",
      nameGap: 25,
      nameTextStyle: {
        fontSize: 11,
      },
    },
    series: [
      {
        name: "Usage Percentage",
        type: "bar",
        barWidth: "60%",
        data: [42.5, 28.3, 15.7, 8.9, 3.2, 1.4],
        itemStyle: {
          color: function(params: { dataIndex: number }) {
            return chartColors[params.dataIndex % chartColors.length];
          },
        },
      },
    ],
  };

  return (
    <>
      {/* Date Filters */}
      <div className="mb-6 flex items-center justify-end">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-colors"
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {getSelectedFilter()?.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                {dateFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      if (filter.value === "custom") {
                        handleCustomDateSelect();
                      } else {
                        setSelectedDateFilter(filter.value);
                        setIsDropdownOpen(false);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                      selectedDateFilter === filter.value
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="font-medium text-sm">{filter.label}</div>
                    <div className="text-xs text-gray-500">{filter.range}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inline Custom Date Picker */}
          {showCustomDatePicker && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                <h4 className="font-medium text-sm text-gray-800">
                  Select Custom Date Range
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate ?? ""}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate ?? ""}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    min={customStartDate ?? undefined}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelCustomDateRange}
                  className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyCustomDateRange}
                  disabled={!customStartDate || !customEndDate}
                  className="px-3 py-1.5 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <Card
          variant="metric"
          metric="Total Transaction Volume"
          score={4567890}
          showPercent={false}
          icon={<BarChart3 className="w-5 h-5" />}
          trend={trends.totalTransactionVolume}
        />
        <Card
          variant="metric"
          metric="Average Transaction Value"
          score={287.45}
          showPercent={false}
          icon={<DollarSign className="w-5 h-5" />}
          trend={trends.avgTransactionValue}
        />
        <Card
          variant="metric"
          metric="Processing Partners"
          score={24}
          showPercent={false}
          icon={<Users className="w-5 h-5" />}
          trend={trends.processingPartners}
        />
        <Card
          variant="metric"
          metric="Payment Methods"
          score={8}
          showPercent={false}
          icon={<CreditCard className="w-5 h-5" />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-5">
        <Card
          variant="metric"
          metric="Geographic Regions"
          score={47}
          showPercent={false}
          icon={<Target className="w-5 h-5" />}
          trend={trends.geographicRegions}
        />
        <Card
          variant="metric"
          metric="Fraud Rate"
          score={0.23}
          showPercent={true}
          icon={<Activity className="w-5 h-5" />}
          trend={trends.fraudRate}
        />
        <Card
          variant="metric"
          metric="Fraud Loss"
          score={12450}
          showPercent={false}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={trends.fraudLoss}
        />
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-5">
        <Card className="p-6 relative">
          <ReactECharts
            option={revenueByCurrencyOption}
            style={{ height: "380px", width: "100%" }}
            opts={{ renderer: "canvas" }}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <AIInsightModal
              insights={aiInsights.revenueByCurrency}
              trigger={
                <button
                  className="flex items-center justify-center w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-full shadow-sm transition-colors"
                  title="AI Insights"
                >
                  <Brain className="w-5 h-5" />
                </button>
              }
            />
          </div>
        </Card>

        <Card className="p-6 relative">
          <ReactECharts
            option={top5AcquirersOption}
            style={{ height: "380px", width: "100%" }}
            opts={{ renderer: "canvas" }}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <AIInsightModal
              insights={aiInsights.top5Acquirers}
              trigger={
                <button
                  className="flex items-center justify-center w-10 h-10 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200 rounded-full shadow-sm transition-colors"
                  title="AI Insights"
                >
                  <Brain className="w-5 h-5" />
                </button>
              }
            />
          </div>
        </Card>

        <Card className="p-6 relative">
          <ReactECharts
            option={paymentMethodOption}
            style={{ height: "380px", width: "100%" }}
            opts={{ renderer: "canvas" }}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <AIInsightModal
              insights={aiInsights.paymentMethods}
              trigger={
                <button
                  className="flex items-center justify-center w-10 h-10 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 rounded-full shadow-sm transition-colors"
                  title="AI Insights"
                >
                  <Brain className="w-5 h-5" />
                </button>
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
