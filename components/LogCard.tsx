import { cn } from "@/lib/utils";

/**
 * Props for LogCard component.
 */

interface LogCardProps {
  score?: number;
  className?: string;
}

/**
 * Renders a log card, optionally showing a score.
 */
const LogCard: React.FC<LogCardProps> = ({ score, className }) => {
  // Removed unused variable collapsed

  return (
    <div
      className={cn(
        "w-full max-w-full h-44 bg-background/50 p-6 rounded-2xl flex flex-col justify-between border border-gray-200",
        className
      )}
    >
      <h1 className="font-bold text-2xl">Logs</h1>
      {score !== undefined && (
        <div className="mt-2 text-sm text-destructive">
          Transaction 1234567 is most likely to be fraud (Fraud score: {score})
        </div>
      )}
    </div>
  );
};

export default LogCard;
