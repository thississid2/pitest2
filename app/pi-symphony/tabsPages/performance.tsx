import AiPerformanceTrends from "../../../components/graphs/aiPerformanceTrends";
import Card from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

const performance = {
  "Fraud Metric": {
    target: 95,
    score: 98.5,
  },
  "Revenue Prediction": {
    target: 90,
    score: 94.2,
  },
  "Customer Segmentation": {
    target: 85,
    score: 91.8,
  },
  "Churn Prediction": {
    target: 85,
    score: 89.3,
  },
  "Price Optimization": {
    target: 92,
    score: 96.1,
  },
};

const Performance = () => {
  return (
    <>
      <Card
        title="AI Performance Trends"
        subtitle="Revenue, transactions, and AI accuracy over time"
        className="mb-6"
      >
        <AiPerformanceTrends />
      </Card>
      <Card
        title="AI Model Performance"
        subtitle="Performance metrics for AI models"
        className="mb-6"
      >
        <div className="mt-5">
          {Object.entries(performance).map(([metric, data]) => (
            <div key={metric} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-sm">{metric}</h3>
                <p className="flex gap-3 text-muted-foreground text-sm">
                  Target: {data.target}%
                  <span className="font-bold text-foreground">
                    {data.score}%
                  </span>
                </p>
              </div>
              <Progress value={data.score} className="mt-2" />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Performance;
