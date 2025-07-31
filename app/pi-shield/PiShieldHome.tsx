"use client";

import { useEffect, useRef, useState } from "react";
import PiShieldTable from "@/components/piShieldTable";
import { useSidebar } from "@/components/ui/sidebar/sidebarContext";
import { cn } from "@/lib/utils";

import SettingsButton from "@/components/ui/settingsButton";
import Card from "@/components/ui/card";
import Toggle from "@/components/ui/toggle";
import LogCard from "@/components/LogCard";

import { DayData, LocalMetrics, FullIncomingData } from "@/types";
import { transformFraudMetricsToTableData } from "@/utils/transformFraudMetricsToTableData";
import { transformDailyMetricsToTableData } from "@/utils/transformDailyMetricsToTableData";

import { getTrend } from "@/utils/metricTrends";
import { extractMetrics } from "@/utils/metricsUtils";
import { DollarSign, HandCoins, PiggyBank, Shield } from "lucide-react";
import Approvals from "@/components/approvals";

const USE_DUMMY_DATA = false;
const SHOW_DUMMY_TRENDS = true; // Set to true to use static example trends

const dummyData: DayData[] = [
  {
    date: "2025-07-01",
    transactions: Array(25).fill(10),
    frauds: Array(25).fill(2),
  },
];

const PiShieldHomePage = () => {
  // Sidebar state
  const { collapsed } = useSidebar();
  // Table view state
  const [view, setView] = useState<"Time" | "Date">("Time");
  // Data states
  const [hourlyData, setHourlyData] = useState<DayData[]>(
    USE_DUMMY_DATA ? dummyData : []
  );
  const [dailyData, setDailyData] = useState<DayData[]>(
    USE_DUMMY_DATA ? dummyData : []
  );
  // Metrics state
  const [metrics, setMetrics] = useState<LocalMetrics>({
    noOfTransactions: 0,
    savings: 0,
    roi: 0,
    recall: 0,
    fpr: 0,
    fraudScore: 0,
  });
  // Previous metrics for trend calculation
  const [prevMetrics, setPrevMetrics] = useState<LocalMetrics | null>(null);

  // Loading and connection state
  const [loading, setLoading] = useState(!USE_DUMMY_DATA);
  const [connected, setConnected] = useState(false);
  // WebSocket ref
  const wsRef = useRef<WebSocket | null>(null);

  // Dummy trends for demo mode
  const dummyTrends = {
    noOfTransactions: 12.5,
    savings: -8.2,
    roi: 0,
    recall: -5.7,
    fpr: 3.1,
    fraudScore: 7.8,
  };

  // Calculate actual trends
  const actualTrends = {
    noOfTransactions: getTrend(
      metrics.noOfTransactions,
      prevMetrics?.noOfTransactions
    ),
    savings: getTrend(metrics.savings, prevMetrics?.savings),
    roi: getTrend(metrics.roi, prevMetrics?.roi),
    recall: getTrend(metrics.recall, prevMetrics?.recall),
    fpr: getTrend(metrics.fpr, prevMetrics?.fpr),
    fraudScore: getTrend(metrics.fraudScore, prevMetrics?.fraudScore),
  };

  // Use dummy or actual trends
  const trends = SHOW_DUMMY_TRENDS ? dummyTrends : actualTrends;

  // Table data update helper
  const updateTableData = (newData: DayData, type: "hourly" | "daily") => {
    const setFn = type === "hourly" ? setHourlyData : setDailyData;
    setFn((prev) => {
      const filtered = prev.filter((d) => d.date !== newData.date);
      return [newData, ...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  };

  // WebSocket connection and message handling
  useEffect(() => {
    if (USE_DUMMY_DATA) return;
    const ws = new WebSocket(`wss://api.payintelli.com/ws`);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as FullIncomingData;
        setLoading(false);
        // Save previous metrics for trend calculation
        setPrevMetrics(metrics);
        // Extract metrics using utility
        const today = new Date();
        const extracted = extractMetrics(data, today);
        setMetrics({
          noOfTransactions: extracted.noOfTransactions,
          savings: extracted.savings,
          roi: extracted.roi,
          recall: extracted.recall,
          fpr: extracted.fpr,
          fraudScore: extracted.fraudScore,
        });
        // Update table data
        if (data["fraud-metrics"]?.hourly) {
          const transformedArray = transformFraudMetricsToTableData(
            data["fraud-metrics"],
            "Time"
          );
          transformedArray.forEach((d) => updateTableData(d, "hourly"));
        }
        if (data["fraud-metrics"]?.daily) {
          const transformedArray = transformDailyMetricsToTableData(
            data["fraud-metrics"].daily
          );
          transformedArray.forEach((d) => updateTableData(d, "daily"));
        }
      } catch (e) {
        console.error("Error parsing WebSocket message", e);
      }
    };
    ws.onclose = () => setConnected(false);
    return () => ws.close();
  }, [metrics]);

  // Select active table data
  const activeTableData = view === "Time" ? hourlyData : dailyData;

  return (
    <div
      className={cn(
        "w-full px-2 sm:px-4 md:px-8 lg:px-0 transition-all duration-300",
        collapsed ? "max-w-[93vw]" : "max-w-[82vw]"
      )}
    >
      <div className="mb-4 ml-1 sm:ml-2">
        <h1 className="flex items-center font-bold text-xl sm:text-2xl">
          Pi Shield
          <span>
            <Shield className="inline-block h-7 w-7 sm:h-8 sm:w-8 text-foreground ml-1" />
          </span>
        </h1>
        <p className="md:text-sm text-base">Monitor your Frauds</p>
      </div>

      <SettingsButton link="/pi-shield/pi-shield-settings" />

      <div
        className="grid grid-cols-1 gap-4 mb-5
        sm:grid-cols-2 sm:grid-rows-3
        md:grid-cols-3 md:grid-rows-3"
      >
        {/* Row 1 */}
        <Card
          variant="metric"
          metric="No. of Transactions"
          score={metrics.noOfTransactions}
          showPercent={false}
          icon={<DollarSign className="w-5 h-5" />}
          trend={trends.noOfTransactions}
          className="row-start-1 col-start-1"
        />
        <Card
          variant="metric"
          metric="Savings"
          score={metrics.savings}
          showCurrency={true}
          icon={<PiggyBank className="w-5 h-5" />}
          trend={trends.savings}
          className="row-start-2 col-start-1 sm:row-start-1 sm:col-start-2 md:row-start-1 md:col-start-2"
        />
        <Card
          variant="metric"
          metric="ROI"
          score={metrics.roi}
          // showPercent={true}
          showCurrency={true}
          icon={<HandCoins className="w-5 h-5" />}
          trend={trends.roi}
          className="row-start-3 col-start-1 sm:row-start-2 sm:col-start-1 md:row-start-1 md:col-start-3"
        />

        {/* Row 2 */}
        <Card
          variant="metric"
          metric="Fraud Detection Rate"
          score={metrics.recall}
          showPercent={true}
          trend={trends.recall}
          goodIfDecrease={true}
          className="row-start-4 col-start-1 sm:row-start-2 sm:col-start-2 md:row-start-2 md:col-start-1"
        />
        <Card
          variant="metric"
          metric="False Decline Rate"
          score={metrics.fpr}
          showPercent={true}
          trend={trends.fpr}
          goodIfDecrease={true}
          className="row-start-5 col-start-1 sm:row-start-3 sm:col-start-1 md:row-start-2 md:col-start-2"
        />
        <Card
          variant="metric"
          metric="Fraud Score"
          score={metrics.fraudScore}
          showPercent={true}
          trend={trends.fraudScore}
          goodIfDecrease={true}
          className="row-start-6 col-start-1 sm:row-start-3 sm:col-start-2 md:row-start-2 md:col-start-3"
        />

        {/* Row 3: Approvals and Logs */}
        <Approvals className="row-start-7 col-start-1 md:row-start-3 md:col-start-1" />
        <LogCard
          score={70}
          className="row-start-8 col-start-1  md:row-start-3 md:col-start-2 md:col-span-2"
        />
      </div>

      {/* Table Card */}
      <Card
        title="Fraud Transactions Monitor"
        className="relative"
        collapsed={collapsed}
      >
        <Toggle
          className="absolute top-5 right-5"
          value={view}
          options={["Time", "Date"]}
          onChange={(val) => setView(val as "Time" | "Date")}
        />
        {loading || activeTableData.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground text-base sm:text-lg">
            {connected
              ? "Waiting for data to arrive..."
              : "Connecting to server..."}
          </div>
        ) : (
          <PiShieldTable view={view} data={activeTableData} />
        )}
      </Card>
    </div>
  );
};

export default PiShieldHomePage;
