import React from "react";
import SettingsButton from "@/components/ui/settingsButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./tabPages/dashboard";
import FinancialPerformance from "./tabPages/financialPerformance";
import {
  BarChart3,
} from "lucide-react";

const PiAnalytics = () => {

  return (
    <>
      <div className="mb-4 ml-1 sm:ml-2">
        <h1 className="flex items-center font-bold text-xl sm:text-2xl">
          Pi Analytics 360
          <span>
            <BarChart3 className="inline-block h-7 w-7 sm:h-8 sm:w-8 text-foreground ml-1" />
          </span>
        </h1>
        <p className="md:text-sm text-base">
          Comprehensive analytics and business intelligence for data-driven payment decisions
        </p>
      </div>

      <SettingsButton link="/pi-analytics/pi-analytics-settings" />

      {/* Tabs Section */}
      <div className="mb-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="performance-monitoring">Performance Monitoring</TabsTrigger>
            <TabsTrigger value="advanced-analytics">Advanced Analytics</TabsTrigger>
            <TabsTrigger value="reports-insights">Reports & Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialPerformance />
          </TabsContent>

          <TabsContent value="risk-assessment">
            <div className="flex flex-col items-center justify-center h-40">
              <span className="text-2xl font-semibold mb-2">Coming Soon</span>
              <p className="text-muted-foreground text-center">
                Risk Assessment is under development. Stay tuned!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="performance-monitoring">
            <div className="flex flex-col items-center justify-center h-40">
              <span className="text-2xl font-semibold mb-2">Coming Soon</span>
              <p className="text-muted-foreground text-center">
                Performance Monitoring is under development. Stay tuned!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="advanced-analytics">
            <div className="flex flex-col items-center justify-center h-40">
              <span className="text-2xl font-semibold mb-2">Coming Soon</span>
              <p className="text-muted-foreground text-center">
                Advanced Analytics features are under development. Stay tuned!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reports-insights">
            <div className="flex flex-col items-center justify-center h-40">
              <span className="text-2xl font-semibold mb-2">Coming Soon</span>
              <p className="text-muted-foreground text-center">
                Reports & Insights features are under development. Stay tuned!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
      </div>
    </>
  );
};

export default PiAnalytics;