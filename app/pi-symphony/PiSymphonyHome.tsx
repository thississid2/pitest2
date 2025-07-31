import Card from "@/components/ui/card";
import SettingsButton from "@/components/ui/settingsButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  DollarSign,
  Music,
  TrendingUpIcon,
  TriangleAlert,
} from "lucide-react";
import Performance from "./tabsPages/performance";
import AiModels from "./tabsPages/aiModels";
import RealTime from "./tabsPages/realTime";

const PiSymphonyHome = () => {
  const trends = {
    accuracy: 12.5,
    predictions: 8.2,
    anomalies: 0,
    savings: -5.7,
  };

  return (
    <>
      <div className="mb-4 ml-1 sm:ml-2">
        <h1 className="flex items-center font-bold text-xl sm:text-2xl">
          Pi Symphony
          <span>
            <Music className="inline-block h-7 w-7 sm:h-8 sm:w-8 text-foreground ml-1" />
          </span>
        </h1>
        <p className="md:text-sm text-base">
          AI-powered data analysis and intelligent insights for your payment
          ecosystem
        </p>
      </div>

      <SettingsButton link="/pi-symphony/pi-symphony-settings" />

      <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-5">
        <Card
          variant="metric"
          metric="AI Accuracy"
          score={85}
          showPercent={true}
          icon={<Brain className="w-5 h-5" />}
          trend={trends.accuracy}
        />
        <Card
          variant="metric"
          metric="Predictions Made"
          score={85}
          showPercent={true}
          icon={<TrendingUpIcon className="w-5 h-5" />}
          trend={trends.predictions}
        />
        <Card
          variant="metric"
          metric="Predictions Made"
          score={85}
          showPercent={true}
          icon={<TriangleAlert className="w-5 h-5" />}
          trend={trends.anomalies}
        />
        <Card
          variant="metric"
          metric="Cost Savings"
          score={85}
          showCurrency={true}
          icon={<DollarSign className="w-5 h-5" />}
          trend={trends.savings}
        />
      </div>
      <div>
        <Tabs defaultValue="performance" className="w-full">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
            <TabsTrigger value="real-time">Real-Time</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Performance />
          </TabsContent>

          <TabsContent value="ai-models">
            <AiModels />
          </TabsContent>
          <TabsContent value="real-time">
            <RealTime />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PiSymphonyHome;
