"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 bg-primary text-foreground rounded-lg text-sm mt-2 font-normal hover:bg-primary/80",
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
