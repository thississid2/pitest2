"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Data structure for acquirer details.
 */
interface AcquirerData {
  name: string;
  obligation: {
    volume?: string;
    amount?: string;
  };
}

/**
 * Props for AcquirerModal component.
 */
interface AcquirerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  acquirerDetails: AcquirerData;
  editIndex: number | null;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "volume" | "amount"
  ) => void;
  onSubmit: () => void;
}

/**
 * Renders a modal for adding or editing acquirer details.
 */
const AcquirerModal: React.FC<AcquirerModalProps> = ({
  isOpen,
  onOpenChange,
  acquirerDetails,
  editIndex,
  onInputChange,
  onSubmit,
}) => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (
      !acquirerDetails.obligation.volume &&
      !acquirerDetails.obligation.amount
    ) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editIndex !== null ? "Edit Acquirer" : "Add Acquirer"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6 py-4 w-full">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="name">
              Acquirer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={acquirerDetails.name ?? ""}
              onChange={(e) => onInputChange(e, "name")}
              placeholder="Enter acquirer name"
              disabled={editIndex !== null}
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Contractual Obligation</Label>
            <div className="flex flex-row gap-4 w-full justify-center items-center">
              <div className="flex flex-col space-y-2 flex-1">
                <Label htmlFor="volume" className="text-sm text-gray-500">
                  Transaction Volume
                </Label>
                <Input
                  id="volume"
                  value={acquirerDetails.obligation.volume ?? ""}
                  onChange={(e) => onInputChange(e, "volume")}
                  placeholder="Enter transaction volume"
                  type="number"
                  className={cn(
                    "w-full",
                    showError && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
              <p className="text-gray-500 mt-7">and/or</p>
              <div className="flex flex-col space-y-2 flex-1">
                <Label htmlFor="amount" className="text-sm text-gray-500">
                  Amount
                </Label>
                <Input
                  id="amount"
                  value={acquirerDetails.obligation.amount ?? ""}
                  onChange={(e) => onInputChange(e, "amount")}
                  placeholder="Enter amount"
                  type="number"
                  className={cn(
                    "w-full",
                    showError && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
            </div>
          </div>
          <p
            className={cn(
              "text-sm",
              showError ? "text-red-500" : "text-gray-500"
            )}
          >
            * At least one of Transaction Volume or Amount must be filled
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            text={editIndex !== null ? "Save Changes" : "Add Acquirer"}
            onClick={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcquirerModal;
