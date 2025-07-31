import { cn } from "@/lib/utils";
import { LucideTrendingUp, LucideTrendingDown } from "lucide-react";

import { getTrendDisplay } from "@/utils/metricTrends";

interface CardProps {
  // For general card usage
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  collapsed?: boolean;
  variant?: "default" | "metric";

  // For metric card usage
  metric?: string;
  score?: number;
  showPercent?: boolean;
  showCurrency?: boolean;
  icon?: React.ReactNode;
  trend?: number;
  goodIfDecrease?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  subtitle,
  headerContent,
  footerContent,
  // Removed unused variable collapsed
  variant = "default",
  metric,
  score,
  showPercent = false,
  showCurrency = false,
  icon,
  trend,
  goodIfDecrease = false,
}) => {
  // Metric card variant
  if (variant === "metric" && metric !== undefined && score !== undefined) {
    const { color, icon: trendIcon } = getTrendDisplay(trend, goodIfDecrease);
    return (
      <div
        className={cn(
          "w-full max-w-full h-44 bg-background/50 p-6 rounded-2xl flex flex-col justify-between border border-gray-200",
          className
        )}
      >
        <div className="flex items-start justify-between w-full">
          <div className="font-semibold text-md md:text-lg text-gray-900">
            {metric}
          </div>
          {/* Icon or currency/percent symbol */}
          <div className="text-sm md:text-2xl text-gray-400 font-bold flex items-center">
            {icon}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-bold text-4xl text-gray-900 mb-2">
            {showCurrency ? " $" : ""}
            {score.toLocaleString()}
            {showPercent ? "%" : ""}
          </div>
          {trend !== undefined && (
            <div className="flex items-center text-sm">
              {color === "green" && (
                <span className="flex items-center text-green-600">
                  {trendIcon === "up" && (
                    <LucideTrendingUp className="w-4 h-4 mr-1" />
                  )}
                  {trendIcon === "down" && (
                    <LucideTrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(trend)}% last month
                </span>
              )}
              {color === "red" && (
                <span className="flex items-center text-red-600">
                  {trendIcon === "up" && (
                    <LucideTrendingUp className="w-4 h-4 mr-1" />
                  )}
                  {trendIcon === "down" && (
                    <LucideTrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(trend)}% last month
                </span>
              )}
              {color === "gray" && <span className="text-gray-500">0%</span>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl py-10 overflow-auto relative bg-background/50 backdrop-blur-lg p-5 border border-gray-200",
        className
      )}
    >
      {(title || subtitle || headerContent) && (
        <div className="mb-4">
          {(title || subtitle) && (
            <div className="mb-2">
              {title && (
                <h2 className="text-sm md:text-lg font-semibold text-gray-900 mb-1">
                  {title}
                </h2>
              )}
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          )}
          {headerContent && (
            <div className="border-b border-gray-100 pb-2">{headerContent}</div>
          )}
        </div>
      )}

      <div className="flex-1">{children}</div>

      {footerContent && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;
