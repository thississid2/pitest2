// import Button  from "@/components/ui/button";
// import Image from "next/image";

"use client";

import { useState, useEffect } from "react";
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

interface Transaction {
  id: string;
  checkout_id: string;
  client_id: string;
  payment_method: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: string;
  amount: number;
  currency: string;
  created_by: string;
  notes: string;
  credit_card_id: string;
  provider_id: string;
  customer_ip: string;
  provider_transaction_id: string;
  provider_reference_id: string;
  fraud_score: number | null;
  processing_fee: number | null;
  user_agent: string;
  error_code: string | null;
  error_message: string | null;
}

interface TransactionResponse {
  status: string;
  count: number;
  transactions: Transaction[];
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.payintelli.com/api/transactions/latest-transactions"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data: TransactionResponse = await response.json();
      setTransactions(data.transactions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getProviderName = (providerId: string) => {
    return (
      providerId.replace("provider_", "").charAt(0).toUpperCase() +
      providerId.replace("provider_", "").slice(1)
    );
  };
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
          <button
            onClick={fetchTransactions}
            className="flex items-center gap-3 font-semibold border border-gray-300 bg-white text-foreground px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-sm"
          >
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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">
                Loading transactions...
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-red-500">Error: {error}</div>
            </div>
          ) : (
            transactions.map((txn) => (
              <Card key={txn.id} className="mb-4">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      `h-2 w-2 rounded-full ` +
                      (txn.status === "SUCCESS"
                        ? "bg-green-500"
                        : txn.status === "FAILED"
                        ? "bg-red-500"
                        : "bg-yellow-400")
                    }
                  ></span>
                  <div className="flex items-center w-full">
                    <div>
                      <h3 className="font-bold text-md">{txn.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(txn.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-auto">
                      <p className="text-right font-bold">
                        {formatAmount(txn.amount, txn.currency)}
                      </p>
                      <span
                        className={
                          `rounded-md px-3 py-1 text-xs font-bold mt-2 ` +
                          (txn.status === "SUCCESS"
                            ? "bg-black text-white"
                            : txn.status === "FAILED"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-700")
                        }
                      >
                        {txn.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
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
