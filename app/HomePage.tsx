// import Button  from "@/components/ui/button";
// import Image from "next/image";

import PaymentMethodsDoughnutChart from "@/components/graphs/paymentMethodsDoughnutChart";
import TodayActivityBarGraph from "@/components/graphs/todayActivityBarGraph";
import TransactionsTrends from "@/components/graphs/transactionsTrends";
import Card from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";

const transactions = [
  {
    id: "TXN001",
    date: "28/01/2025, 16:00:00",
    method: "Stripe",
    amount: "$300",
    status: "success",
  },
  {
    id: "TXN002",
    date: "28/01/2025, 15:55:00",
    method: "PayPal",
    amount: "$150",
    status: "success",
  },
  {
    id: "TXN003",
    date: "28/01/2025, 15:50:00",
    method: "Adyen",
    amount: "$90",
    status: "failed",
  },
  {
    id: "TXN004",
    date: "28/01/2025, 15:45:00",
    method: "Stripe",
    amount: "$599",
    status: "success",
  },
  {
    id: "TXN005",
    date: "28/01/2025, 15:40:00",
    method: "Square",
    amount: "$200",
    status: "pending",
  },
];

export default function Home() {
  return (
    <>
      <div className="flex justify-between mb-4 ml-1 sm:ml-2">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">Dashboard</h1>
          <p className="md:text-sm text-base">
            Welcome back! Here&apos;s what&apos;s happening with your business
            today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 font-semibold border border-gray-300 bg-white text-foreground px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-sm">
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
          <button className="bg-foreground text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-gray-900 transition-colors text-sm">
            View Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-6">
        <Card
          variant="metric"
          metric="Total Revenue"
          score={2847293}
          trend={12.5}
          showCurrency={true}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <Card
          variant="metric"
          metric="Total Transactions"
          score={0}
          trend={0}
          icon={<CreditCard className="w-5 h-5" />}
        />
        <Card
          variant="metric"
          metric="Success Rate"
          score={0}
          trend={0}
          showPercent={true}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <Card
          variant="metric"
          metric="Active Integrations"
          score={0}
          trend={0}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <Card
          title="Transaction Trends"
          subtitle="Monthly transaction volume and revenue over time"
          className="flex-3/2"
        >
          <TransactionsTrends />
        </Card>
        <Card
          title="Payment Methods"
          subtitle="Distribution of payment methods used"
        >
          <PaymentMethodsDoughnutChart />
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Card
          title="Recent Transactions"
          subtitle="Latest payment transactions and their status"
          className="flex-3/2"
        >
          {transactions.map((txn) => (
            <Card key={txn.id} className="mb-4">
              <div className="flex items-center gap-4">
                <span
                  className={
                    `h-2 w-2 rounded-full ` +
                    (txn.status === "success"
                      ? "bg-green-500"
                      : txn.status === "failed"
                      ? "bg-red-500"
                      : "bg-yellow-400")
                  }
                ></span>
                <div className="flex items-center w-full">
                  <div>
                    <h3 className="font-bold text-md">{txn.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {txn.date} &bull; {txn.method}
                    </p>
                  </div>
                  <div className="flex flex-col items-end ml-auto">
                    <p className="text-right font-bold">{txn.amount}</p>
                    <span
                      className={
                        `rounded-md px-3 py-1 text-xs font-bold mt-2 ` +
                        (txn.status === "success"
                          ? "bg-black text-white"
                          : txn.status === "failed"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700")
                      }
                    >
                      {txn.status}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </Card>
        <Card
          title="Payment Methods"
          subtitle="Distribution of payment methods used"
        >
          <div>
            <Card
              title="Integration Status"
              subtitle="Current status of payment integrations"
              className="mb-6"
            >
              {[
                { name: "Stripe", status: "connected" },
                { name: "PayPal", status: "connected" },
                { name: "Adyen", status: "connected" },
                { name: "Square", status: "disconnected" },
              ].map((integration) => (
                <div
                  className="flex items-center justify-between mb-4"
                  key={integration.name}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        `h-3 w-3 rounded-full ` +
                        (integration.status === "connected"
                          ? "bg-green-500"
                          : "bg-gray-400")
                      }
                    ></span>
                    <h3 className="font-semibold text-md">
                      {integration.name}
                    </h3>
                  </div>
                  <span
                    className={
                      `rounded-md px-3 py-1 text-xs font-bold ` +
                      (integration.status === "connected"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-700")
                    }
                  >
                    {integration.status}
                  </span>
                </div>
              ))}
            </Card>
            <Card
              title="Today's Activity"
              subtitle="Transaction volume by hour"
            >
              <TodayActivityBarGraph />
            </Card>
          </div>
        </Card>
      </div>
    </>
  );
}
