import { cn } from "@/lib/utils";
import { Settings, Shield, TrendingUp, UsersIcon } from "lucide-react";
import Card from "../../../components/ui/card";

const models = {
  "Fraud Detection": {
    description: "Real-time fraud analysis",
    status: "Active",
    accuracy: 98.5,
    lastUpdated: 2,
    icon: Shield,
  },
  "Revenue Predictions": {
    description: "Future revenue forecasting",
    status: "Active",
    accuracy: 94.2,
    lastUpdated: 1,
    icon: TrendingUp,
  },
  "Customer Segmentation": {
    description: "Intelligent customer grouping",
    status: "Inactive",
    accuracy: 91.8,
    lastUpdated: 3,
    icon: UsersIcon,
  },
};

const AiModels = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-2 mb-5">
      {Object.entries(models).map(([modelName, modelMetrics]) => {
        const Icon = modelMetrics.icon;
        return (
          <div key={modelName}>
            <Card className="mb-6">
              <div className="mb-5">
                <h2 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 flex items-center">
                  <Icon className="mr-1 w-5 h-5" />
                  {modelName}
                </h2>
                <p className="text-sm text-gray-600">
                  {modelMetrics.description}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-sm">Status</h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={cn(
                      modelMetrics.status === "Active"
                        ? "bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded"
                        : "bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded"
                    )}
                  >
                    {modelMetrics.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-sm">Accuracy</h3>
                <p className="font-bold">{modelMetrics.accuracy}%</p>
              </div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-sm">Last Updated</h3>
                <p className="text-muted-foreground text-md">
                  {modelMetrics.lastUpdated} hours ago
                </p>
              </div>
              <button className="w-full bg-foreground text-white py-2 rounded-lg hover:bg-black transition-colors flex justify-center items-center">
                <span className="flex items-center justify-center gap-2 font-semibold">
                  <Settings className="w-4 h-4" /> Configure
                </span>
              </button>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AiModels;
