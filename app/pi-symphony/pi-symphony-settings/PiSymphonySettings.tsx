"use client";

import { useState, useEffect } from "react";
import { adjustSlidersToSum100, normalizeKey } from "@/utils/sliderUtils";
import { useSidebar } from "@/components/ui/sidebar/sidebarContext";
import { cn } from "@/lib/utils";

import ContractualObligationTable from "@/components/contractualObligationTable";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import MonthlyProjections from "@/components/monthlyProjections";
import HistoricalProjections from "@/components/historicalProjections";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Trash, Pencil, Snowflake, Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import AcquirerModal from "@/components/acquirerModal";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

interface AcquirerData {
  name: string;
  obligation: {
    volume?: string;
    amount?: string;
  };
}

const PiSymphonySettingsPage = () => {
  const { collapsed } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [acquirerDetails, setAcquirerDetails] = useState<AcquirerData>({
    name: "",
    obligation: { volume: "", amount: "" },
  });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    acquirer: string | null;
  }>({ open: false, acquirer: null });

  // Acquirer data state (start empty, fully dynamic)
  const [acquirersData, setAcquirersData] = useState<
    Record<string, AcquirerData>
  >({});
  const [sliderValue, setSliderValue] = useState<Record<string, number>>({});

  // On mount, fetch acquirer names from API and initialize acquirersData and sliderValue
  useEffect(() => {
    const fetchAcquirers = async () => {
      try {
        const response = await fetch(
          "https://api.payintelli.com/api/processing-volume"
        );
        if (!response.ok) throw new Error("Failed to fetch acquirers");
        const result = await response.json();
        if (result && result.processing_volume) {
          const acquirerNames = Object.keys(result.processing_volume);
          setAcquirersData((prev) => {
            const newData = { ...prev };
            acquirerNames.forEach((name) => {
              if (!newData[name]) {
                newData[name] = { name, obligation: {} };
              }
            });
            return newData;
          });
          setSliderValue((prev) => {
            const newSliders = { ...prev };
            acquirerNames.forEach((name) => {
              const key = normalizeKey(name);
              if (newSliders[key] === undefined) {
                newSliders[key] = 0;
              }
            });
            return newSliders;
          });
        }
      } catch {
        // fail silently, user can add acquirers manually
      }
    };
    fetchAcquirers();
  }, []);

  // Track which acquirers are frozen
  const [frozenAcquirers, setFrozenAcquirers] = useState<
    Record<string, boolean>
  >({});

  const handleToggleFreeze = (acquirer: string) => {
    setFrozenAcquirers((prev) => ({
      ...prev,
      [acquirer]: !prev[acquirer],
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "volume" | "amount"
  ) => {
    const value = e.target.value ?? "";
    if (field === "name") {
      setAcquirerDetails((prev) => ({
        ...prev,
        name: value,
      }));
    } else {
      setAcquirerDetails((prev) => ({
        ...prev,
        obligation: {
          ...prev.obligation,
          [field]: value,
        },
      }));
    }
  };

  const handleAddAcquirer = () => {
    if (acquirerDetails.name) {
      // Removed unused variable acquirerKey
      if (editIndex !== null) {
        // Edit existing acquirer
        const acquirerName = Object.keys(acquirersData)[editIndex];
        setAcquirersData((prev) => ({
          ...prev,
          [acquirerName]: {
            ...prev[acquirerName],
            obligation: acquirerDetails.obligation,
          },
        }));
        setEditIndex(null);
      } else {
        setAcquirersData((prev) => ({
          ...prev,
          [acquirerDetails.name]: {
            name: acquirerDetails.name,
            obligation: acquirerDetails.obligation,
          },
        }));
      }
      // Reset form
      setAcquirerDetails({
        name: "",
        obligation: { volume: "", amount: "" },
      });
      setIsModalOpen(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditIndex(null);
    setAcquirerDetails({
      name: "",
      obligation: { volume: "", amount: "" },
    });
    setIsModalOpen(true);
  };

  const handleEdit = (acquirer: string, index: number) => {
    setEditIndex(index);
    const acquirerData = acquirersData[acquirer];
    setAcquirerDetails({
      name: acquirer,
      obligation: acquirerData.obligation,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (acquirer: string) => {
    const newData = { ...acquirersData };
    delete newData[acquirer];
    setAcquirersData(newData);
    setDeleteModal({ open: false, acquirer: null });
  };

  return (
    <>
      <h1 className="font-bold text-2xl">Pi-Symphony Settings</h1>
      <div
        className={cn(
          "mt-5 w-full px-2 sm:px-4 md:px-8 lg:px-0",
          collapsed ? "max-w-[98vw]" : "max-w-[1365px]"
        )}
      >
        <AcquirerModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          editIndex={editIndex}
          acquirerDetails={acquirerDetails}
          onInputChange={handleInputChange}
          onSubmit={handleAddAcquirer}
        />

        {/* projection graph */}
        <Card
          title="Projection"
          className="mb-3 relative"
          collapsed={collapsed}
        >
          <div className="absolute top-3 right-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <Info className="w-4 h-4 text-foreground cursor-pointer" />
                </span>
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="w-xs">
                View historical and monthly projections for your acquirers. Use
                this data to inform your split and obligation decisions.
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-4 md:justify-between md:items-center">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Historical Performance
              </h3>
              <HistoricalProjections />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Monthly Expected Projection
              </h3>
              <MonthlyProjections />
            </div>
          </div>
        </Card>

        {/* acquirers table */}
        <Card
          title="Contractual Obligation Configuration"
          collapsed={collapsed}
        >
          <div className="absolute top-3 right-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <Info className="w-4 h-4 text-foreground cursor-pointer" />
                </span>
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="w-xs">
                This table shows the current processing volumes and contractual
                obligations for each acquirer. Completion rate is calculated as
                current volume divided by obligation.
              </TooltipContent>
            </Tooltip>
          </div>
          <ContractualObligationTable
            contractObligations={Object.fromEntries(
              Object.entries(acquirersData).map(([key, data]) => [
                normalizeKey(key),
                data.obligation.volume ?? "",
              ])
            )}
          />
        </Card>

        <div className="mt-5 flex flex-col gap-5 relative md:flex-row items-start">
          <Card
            title=""
            className="relative flex-3/5 w-full md:w-3/5"
            collapsed={collapsed}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2 pt-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">Splitting</span>
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
              <Button
                text="Add Acquirer"
                className="!py-1 !px-4 !rounded-lg mt-2 sm:mt-0"
                onClick={handleOpenAddModal}
              />
            </div>
            {[...Object.entries(acquirersData)].map(([acquirer, data], idx) => {
              const isFrozen = frozenAcquirers[acquirer];
              const acquirerKey = normalizeKey(acquirer);
              return (
                <div
                  key={acquirer}
                  className={
                    "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3" +
                    (idx === Object.keys(acquirersData).length - 1
                      ? " mb-5"
                      : "")
                  }
                >
                  <h3 className="w-20 min-w-[80px]">{data.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Slider
                      id={`slider-${acquirerKey}`}
                      className="w-full min-w-[120px] max-w-[180px] sm:w-80"
                      defaultValue={[0]}
                      max={100}
                      step={1}
                      value={[sliderValue[acquirerKey] || 0]}
                      onValueChange={(value) => {
                        if (isFrozen) return;
                        setSliderValue((prev) => {
                          // Always use normalized keys for sliderValue
                          return adjustSlidersToSum100(
                            prev,
                            frozenAcquirers,
                            Object.fromEntries(
                              Object.entries(acquirersData).map(([k, v]) => [
                                normalizeKey(k),
                                v,
                              ])
                            ),
                            acquirerKey,
                            value[0]
                          );
                        });
                      }}
                      disabled={isFrozen}
                      style={isFrozen ? { color: "#a21caf" } : {}}
                    />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={
                        sliderValue[acquirerKey] === 0
                          ? ""
                          : sliderValue[acquirerKey] ?? ""
                      }
                      placeholder={
                        sliderValue[acquirerKey] === 0
                          ? "0"
                          : String(sliderValue[acquirerKey] ?? "")
                      }
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val)) val = 0;
                        if (val < 0) val = 0;
                        if (val > 100) val = 100;
                        if (isFrozen) return;
                        setSliderValue((prev) =>
                          adjustSlidersToSum100(
                            prev,
                            frozenAcquirers,
                            Object.fromEntries(
                              Object.entries(acquirersData).map(([k, v]) => [
                                normalizeKey(k),
                                v,
                              ])
                            ),
                            acquirerKey,
                            val
                          )
                        );
                      }}
                      className="text-center text-base font-semibold border rounded max-w-[48px] px-1 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ width: 48 }}
                      disabled={isFrozen}
                    />
                    <span className="ml-1 text-base font-semibold">%</span>
                  </div>
                  <div className="flex items-center gap-2 ml-2 mt-2 sm:mt-0">
                    <Pencil
                      className="w-4 h-4 cursor-pointer text-foreground hover:text-secondary"
                      onClick={() =>
                        handleEdit(
                          acquirer,
                          Object.keys(acquirersData).indexOf(acquirer)
                        )
                      }
                    />
                    <Trash
                      className="w-4 h-4 cursor-pointer text-foreground hover:text-red-500"
                      onClick={() => setDeleteModal({ open: true, acquirer })}
                    />
                    <Snowflake
                      className={`w-4 h-4 cursor-pointer ${
                        isFrozen
                          ? "text-cyan-500"
                          : "text-foreground hover:text-cyan-500"
                      }`}
                      onClick={() => handleToggleFreeze(acquirer)}
                    />
                  </div>
                </div>
              );
            })}

            {/* Warning if sum != 100 and any slider is frozen */}
            {(() => {
              const sum = Object.values(sliderValue).reduce((a, b) => a + b, 0);
              const anyFrozen = Object.values(frozenAcquirers).some(Boolean);
              if (anyFrozen && sum > 100) {
                return (
                  <div className="text-red-500 mt-2 font-medium">
                    Warning: The total exceeds 100%. Adjust unfrozen sliders.
                  </div>
                );
              }
              return null;
            })()}
            <Button text="Execute" className="absolute bottom-5 right-5" />
          </Card>

          <Card
            title=""
            className="font-bold text-2xl relative w-full md:w-2/5"
            collapsed={collapsed}
          >
            <h2 className="font-bold text-xl">Let AI Takeover for you</h2>
            <p className="text-sm mt-5 font-normal w-80 text-gray-600">
              Pi-Symphony can help you automate the process of splitting
              contractual obligations across different acquirers.
            </p>
            <Button text="Execute" className="absolute bottom-5 right-5" />
          </Card>
        </div>
      </div>
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteModal.open}
        acquirer={deleteModal.acquirer}
        onCancel={() => setDeleteModal({ open: false, acquirer: null })}
        onConfirm={() => handleDelete(deleteModal.acquirer!)}
      />
    </>
  );
};

export default PiSymphonySettingsPage;
