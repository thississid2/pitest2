import { Activity, Eye } from "lucide-react";
import RealTimeChart from "../../../components/graphs/realTimeChart";
import Card from "../../../components/ui/card";

const text = {
  title: "Live AI Processing",
  description: "Current AI Engine Status",
  pq: 247,
  avgResponseTime: 0.5,
  cpuUsage: 12.3,
  memoryUsage: 45.6,
};

const RealTime = () => {
  return (
    <>
      <Card className="mb-6">
        <div className="mb-5">
          <h2 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 flex items-center">
            <Activity className=" mr-1 w-5 h-5" />
            Real-Time Transaction Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Live transaction monitoring and AI insights
          </p>
        </div>
        <RealTimeChart />
      </Card>

      <div className="flex gap-2">
        <Card>
          <div className="mb-5">
            <h2 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 flex items-center">
              {text.title}
            </h2>
            <p className="text-sm text-gray-600">{text.description}</p>
          </div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-sm">Processing Queue</h3>
            <p className="font-bold">{text.pq} items</p>
          </div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-sm">Average Response Time</h3>
            <p className="font-bold">{text.avgResponseTime}s</p>
          </div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-sm">CPU Usage</h3>
            <p className="font-bold">{text.cpuUsage}%</p>
          </div>
          <div className="flex justify-between mb-4">
            <h3 className="font-medium text-sm">Memory Usage</h3>
            <p className="font-bold">{text.memoryUsage}GB</p>
          </div>
          <button className="w-full bg-foreground text-white py-2 rounded-lg hover:bg-black transition-colors flex justify-center items-center">
            <span className="flex items-center justify-center gap-2 font-semibold">
              <Eye className="w-4 h-4" /> View System Status
            </span>
          </button>
        </Card>
        {/* <Card></Card> */}
      </div>
    </>
  );
};

export default RealTime;
