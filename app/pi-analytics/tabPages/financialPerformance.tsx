import React, { useState } from "react";
import Card from "@/components/ui/card";
import ReactECharts from 'echarts-for-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar,
  CalendarDays,
  ChevronDown,
  Brain,
  Sparkles,
} from "lucide-react";

const FinancialPerformance = () => {
  const [selectedDateFilter, setSelectedDateFilter] = useState('MTD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // Date filter options
  const dateFilters = [
    { value: 'today', label: 'Today', range: 'July 29, 2025' },
    { value: 'yesterday', label: 'Yesterday', range: 'July 28, 2025' },
    { value: 'weekly', label: 'Last 7 Days', range: 'July 23 - July 29, 2025' },
    { value: 'MTD', label: 'Month to Date', range: 'July 1 - July 29, 2025' },
    { value: 'YTD', label: 'Year to Date', range: 'Jan 1 - July 29, 2025' },
    { value: 'custom', label: 'Custom Range', range: 'Select dates...' }
  ];

  const getSelectedFilter = () => {
    const filter = dateFilters.find(f => f.value === selectedDateFilter);
    if (selectedDateFilter === 'custom' && customStartDate && customEndDate) {
      return {
        ...filter,
        label: 'Custom Range',
        range: `${customStartDate} - ${customEndDate}`
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
      setSelectedDateFilter('custom');
      setShowCustomDatePicker(false);
    }
  };

  const cancelCustomDateRange = () => {
    setShowCustomDatePicker(false);
    setCustomStartDate('');
    setCustomEndDate('');
  };

  const trends = {
    totalTransactionVolume: 18.5,
    totalTransactions: 12.3,
    avgTransactionValue: 6.8,
  };

  // Chart colors - Same palette as Dashboard for consistency
  const chartColors = [
    '#f69a60ff', // Orange
    '#df4d4dff', // Red
    '#e174abff', // Hot pink
    '#8e65d6ff', // Purple
    '#51a7d2ff', // Sky blue
    '#FF6B35', // Bright orange
    '#B91C1C', // Dark red
    '#BE185D', // Deep pink
    '#5B21B6', // Dark purple
    '#1E3A8A', // Navy blue
  ];

  // AI Insights data
  const aiInsights = {
    salesByCurrency: {
      title: "Sales by Currency Analysis",
      insights: [
        "USD sales lead at 45.3%, showing strong domestic market performance",
        "EUR sales represent 28.7%, indicating robust European market presence",
        "GBP contributes 18.2%, reflecting solid UK market penetration",
        "Emerging currency markets (CAD, Others) show 7.8% combined opportunity",
        "Currency diversification reduces risk exposure by 32%"
      ],
      recommendation: "Focus on expanding EUR and GBP markets while maintaining USD dominance. Consider hedging strategies for currency fluctuation protection."
    },
    processingFeeAnalysis: {
      title: "Processing Fee Cost Analysis",
      insights: [
        "Credit card processing fees average 2.9%, highest among payment methods",
        "Digital wallet fees at 2.1% offer cost advantage over traditional cards",
        "Bank transfer fees lowest at 0.8%, ideal for high-value transactions",
        "Debit card processing at 1.9% provides balanced cost-conversion ratio",
        "Total processing costs represent 2.3% of gross transaction volume"
      ],
      recommendation: "Optimize payment method mix by promoting lower-cost options like digital wallets and bank transfers for appropriate transaction types. Negotiate better rates with high-volume processors."
    }
  };

  // AI Insight Component
  type AIInsight = {
    title: string;
    insights: string[];
    recommendation: string;
  };
  const AIInsightModal = ({ insights, trigger }: { insights: AIInsight, trigger: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
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
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
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

  // Sales by Currency Pie Chart
  const salesByCurrencyOption = {
    title: {
      text: 'Sales by Currency',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3748'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ${c}M ({d}%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      textStyle: {
        color: '#2D3748'
      }
    },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        radius: ['40%', '75%'],
        center: ['50%', '55%'],
        data: [
          { value: 2134, name: 'USD' },
          { value: 1352, name: 'EUR' },
          { value: 857, name: 'GBP' },
          { value: 298, name: 'CAD' },
          { value: 167, name: 'Others' }
        ],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{d}%',
          fontSize: 11,
          fontWeight: 'bold',
          color: '#4A5568'
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
          smooth: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: 3,
            borderColor: '#FFFFFF'
          },
          scale: true,
          scaleSize: 5
        },
        itemStyle: {
          borderRadius: 8,
          borderWidth: 2,
          borderColor: '#FFFFFF',
          color: function(params: { dataIndex: number }) {
            return chartColors[params.dataIndex % chartColors.length];
          }
        }
      }
    ]
  };

  // Processing Fee Analysis Horizontal Bar Chart
  const processingFeeOption = {
    title: {
      text: 'Processing Fee Analysis',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3748'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(59, 130, 246, 0.1)'
        }
      },
      formatter: function(params: Array<{ name: string; seriesName: string; value: number; dataIndex: number }>) {
        let result = '<div style="font-weight: bold; margin-bottom: 4px;">' + params[0].name + '</div>';
        params.forEach((item) => {
          // Use colors from our palette based on series and data index
          let color;
          if (item.seriesName === 'Processing Fee %') {
            color = chartColors[item.dataIndex % chartColors.length];
          } else {
            color = chartColors[(item.dataIndex + 5) % chartColors.length];
          }
          result += '<div style="display: flex; align-items: center; margin: 2px 0;">';
          result += '<span style="display: inline-block; width: 10px; height: 10px; background: ' + color + '; border-radius: 50%; margin-right: 8px;"></span>';
          result += item.seriesName + ': <strong>' + item.value + '%</strong></div>';
        });
        return result;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      textStyle: {
        color: '#2D3748'
      }
    },
    grid: {
      left: '15%',
      right: '10%',
      bottom: '15%',
      top: '30%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'Percentage (%)',
      nameLocation: 'middle',
      nameGap: 25,
      nameTextStyle: {
        fontSize: 11,
        color: '#4A5568',
        fontWeight: 'bold'
      },
      axisLine: {
        lineStyle: {
          color: '#E2E8F0'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#E2E8F0'
        }
      },
      axisLabel: {
        color: '#718096'
      },
      splitLine: {
        lineStyle: {
          color: '#F7FAFC',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['Credit Card', 'Digital Wallet', 'Debit Card', 'Bank Transfer', 'Crypto'],
      axisLabel: {
        fontSize: 10,
        color: '#4A5568',
        fontWeight: 'bold'
      },
      axisLine: {
        lineStyle: {
          color: '#E2E8F0'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: 'Processing Fee %',
        type: 'bar',
        barWidth: 16,
        data: [2.9, 2.1, 1.9, 0.8, 1.5],
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: function(params: { dataIndex: number }) {
            return chartColors[params.dataIndex % chartColors.length];
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(59, 130, 246, 0.4)'
          }
        }
      },
      {
        name: 'Transaction Volume',
        type: 'bar',
        barWidth: 16,
        data: [45.2, 18.7, 25.3, 8.4, 2.4],
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: function(params: { dataIndex: number }) {
            return chartColors[(params.dataIndex + 5) % chartColors.length];
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(16, 185, 129, 0.4)'
          }
        }
      }
    ]
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
            <span className="text-sm font-medium text-gray-700">{getSelectedFilter()?.label}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                {dateFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      if (filter.value === 'custom') {
                        handleCustomDateSelect();
                      } else {
                        setSelectedDateFilter(filter.value);
                        setIsDropdownOpen(false);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                      selectedDateFilter === filter.value
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700'
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
                <h4 className="font-medium text-sm text-gray-800">Select Custom Date Range</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    min={customStartDate}
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

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card
          variant="metric"
          metric="Total Transaction Volume"
          score={7234567}
          showPercent={false}
          icon={<BarChart3 className="w-5 h-5" />}
          trend={trends.totalTransactionVolume}
        />
        <Card
          variant="metric"
          metric="Total Transactions"
          score={123456}
          showPercent={false}
          icon={<CreditCard className="w-5 h-5" />}
          trend={trends.totalTransactions}
        />
        <Card
          variant="metric"
          metric="Average Transaction Value"
          score={358.92}
          showPercent={false}
          icon={<DollarSign className="w-5 h-5" />}
          trend={trends.avgTransactionValue}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="p-6 relative">
          <ReactECharts 
            option={salesByCurrencyOption} 
            style={{ height: '400px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <AIInsightModal 
              insights={aiInsights.salesByCurrency}
              trigger={
                <button className="flex items-center justify-center w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-full shadow-sm transition-colors" title="AI Insights">
                  <Brain className="w-5 h-5" />
                </button>
              }
            />
          </div>
        </Card>
        
        <Card className="p-6 relative">
          <ReactECharts 
            option={processingFeeOption} 
            style={{ height: '400px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <AIInsightModal 
              insights={aiInsights.processingFeeAnalysis}
              trigger={
                <button className="flex items-center justify-center w-10 h-10 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 rounded-full shadow-sm transition-colors" title="AI Insights">
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

export default FinancialPerformance;
