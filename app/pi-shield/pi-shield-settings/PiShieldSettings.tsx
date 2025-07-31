"use client";

import { useState, useRef } from "react";
import { handleFiles, handleDrag, handleDrop } from "@/utils/fileUploadUtils";
import { useSidebar } from "@/components/ui/sidebar/sidebarContext";
import Card from "@/components/ui/card";
import { TwoPointSlider } from "@/components/ui/twopointslider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info, Upload } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PiShieldSettingsPage = () => {
  const { collapsed } = useSidebar();
  const [trainingDays, setTrainingDays] = useState<number>(60);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  return (
    <>
      <h1 className="font-bold text-2xl mb-5">Pi-Shield Settings</h1>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-5 items-start sm:items-center mb-5">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <h2>Fraud Rate</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Info className="w-4 h-4 text-foreground cursor-pointer" />
              </span>
            </TooltipTrigger>
            <TooltipContent sideOffset={6} className="w-xs">
              Distribute the total split percentage across all acquirers. Use
              the sliders to adjust each acquirer&apos;s share. Frozen acquirers
              cannot be changed.
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:items-center">
          <div className="w-full flex justify-center sm:block">
            <TwoPointSlider
              defaultValue={[40, 70]}
              max={100}
              min={0}
              className="min-w-[200px] max-w-[350px] w-full sm:w-80"
            />
          </div>
        </div>
      </div>
      <Card
        title="Retrain the model"
        className="mb-5 relative"
        collapsed={collapsed}
      >
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-5 sm:items-center">
            <h2>No. of Days :</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:items-center w-full">
              <div className="flex items-center w-full justify-center sm:w-auto gap-2">
                <Slider
                  defaultValue={[60]}
                  min={0}
                  max={120}
                  step={30}
                  className="w-full sm:w-80"
                  value={[trainingDays]}
                  onValueChange={(value) => setTrainingDays(value[0])}
                />
                <Input
                  type="number"
                  min={0}
                  max={120}
                  step={30}
                  value={trainingDays}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (isNaN(val)) val = 0;
                    if (val < 0) val = 0;
                    if (val > 120) val = 120;
                    setTrainingDays(val);
                  }}
                  className="text-center text-base font-semibold border rounded max-w-[48px] px-1 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ width: 48 }}
                />
                <span className="text-base font-semibold">Days</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6} className="w-xs">
                    Distribute the total split percentage across all acquirers.
                    Use the sliders to adjust each acquirer&apos;s share. Frozen
                    acquirers cannot be changed.
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <h2 className="text-center my-2 sm:ml-64">OR</h2>
          <div className="relative flex flex-col gap-4 pb-4">
            <div
              className={cn(
                "w-full max-w-[95vw] h-[200px] sm:w-[600px] sm:h-[250px] bg-muted border-2 border-dashed border-grey-300 rounded-2xl flex flex-col items-center justify-center my-4 transition-colors duration-150",
                {
                  "border-accent bg-accent": dragActive,
                }
              )}
              onDragEnter={(e) => handleDrag(e, setDragActive)}
              onDragOver={(e) => handleDrag(e, setDragActive)}
              onDragLeave={(e) => handleDrag(e, setDragActive)}
              onDrop={(e) => handleDrop(e, setDragActive, handleFiles)}
            >
              <Upload className="w-10 h-10 text-gray-500 mb-3" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg text-center text-gray-500 font-medium">
                  Drag & drop
                </span>
              </div>
              <p className="text-gray-500">Or</p>
              <Button
                text="Browse files"
                className="bg-white text-gray-800 border border-gray-400 rounded-lg px-6 py-2 font-semibold shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              />
              <input
                id="csv-upload"
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
            {/* Button: absolute on desktop, centered on mobile */}
            <div className="flex justify-center w-full sm:block">
              <Button
                text="Retrain Model"
                className="mt-2 w-full max-w-xs sm:max-w-[200px] sm:absolute sm:bottom-0 sm:right-0 sm:mb-4 sm:mr-4"
              />
            </div>
          </div>
        </div>
      </Card>
      <h1 className="font-bold text-xl mb-3">Metrics after training</h1>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <Card variant="metric" metric="Fraud Detection Rate" score={50} />
        <Card variant="metric" metric="False Decline Rate" score={50} />
        <Card variant="metric" metric="Fraud Score" score={50} />
      </div>
    </>
  );
};

export default PiShieldSettingsPage;
