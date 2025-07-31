import Card from "./ui/card";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";

interface ApprovalsProps {
  className?: string;
}

const Approvals = ({ className }: ApprovalsProps) => {
  return (
    <Card
      title="Pending Approvals"
      className={cn("order-7 row-start-3 col-start-1 col-span-1", className)}
    >
      <MoveRight
        className="absolute top-5 right-5 hover:translate-x-1 transition-transform"
        href="/"
      />
      <p className="font-bold text-4xl text-gray-900 mb-2">5</p>
    </Card>
  );
};

export default Approvals;
