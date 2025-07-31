"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, Trash, Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

/**
 * Props for AcquirerContract component.
 */
interface AcquirerContractProps {
  acquirer: string;
  obligation: string;
  apiKey: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Renders a contract row for an acquirer, with API key visibility and edit/delete actions.
 */
const AcquirerContract: React.FC<AcquirerContractProps> = ({
  acquirer,
  apiKey,
  onEdit,
  onDelete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("Click to copy");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCopy = async () => {
    const textToCopy = isVisible ? apiKey : "XXXX-XXXX-XXX";
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTooltipContent("Copied!");
      setTimeout(() => setTooltipContent("Click to copy"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <h3 className="w-20">{acquirer}</h3>
      <div className="bg-muted min-w-60 h-8 rounded relative flex items-center px-3 border-1 border-foreground mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                onClick={handleCopy}
                className="text-sm font-mono cursor-pointer hover:text-secondary transition-colors"
              >
                {isVisible ? apiKey : "XXXX-XXXX-XXX"}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="absolute right-0 h-full flex items-center px-3 bg-white rounded-r border-l-1 border-foreground">
          <button
            onClick={toggleVisibility}
            className="hover:text-secondary transition-colors"
          >
            {isVisible ? (
              <EyeIcon className="h-4 w-4" />
            ) : (
              <EyeOffIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div>
        <button onClick={onDelete}>
          <Trash className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" />
        </button>
        <button onClick={onEdit}>
          <Pencil className="h-5 w-5 text-foreground hover:text-secondary transition-colors ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AcquirerContract;
