"use client";
import { useProcessingVolume } from "@/hooks/useProcessingVolume";

interface ContractualObligationTableProps {
  apiData?: {
    status: string;
    processing_volume: Record<string, number>;
  };
  contractObligations?: Record<string, string>;
}

const ContractualObligationTable = ({
  apiData,
  contractObligations = {},
}: ContractualObligationTableProps) => {
  // Use custom hook for API data
  const { loading, data } = useProcessingVolume(apiData);

  // Transform API data to acquirers array
  const acquirers = data?.processing_volume
    ? Object.entries(data.processing_volume).map(([name, volume]) => ({
        name,
        key: name.toLowerCase().replace(/\s+/g, ""), // Handle spaces in names
        volume,
      }))
    : [];

  // Function to calculate completion rate
  const calculateCompletionRate = (
    current: number,
    obligation: string
  ): string => {
    const obligationValue = parseFloat(obligation.replace(/,/g, ""));
    if (!obligationValue || obligationValue === 0) return "0%";

    const rate = (current / obligationValue) * 100;
    return `${Math.round(rate)}%`;
  };

  // No input changes needed

  // Show loading state
  if (loading) {
    return (
      <div className="w-full p-5 max-w-vw mt-3">
        <div className="text-center py-10 text-gray-500">
          Loading processing volumes...
        </div>
      </div>
    );
  }

  // Show error state
  if (
    !data ||
    !data.processing_volume ||
    Object.keys(data.processing_volume).length === 0
  ) {
    return (
      <div className="w-full p-5 max-w-vw mt-3">
        <div className="text-center py-10 text-gray-500">
          No processing volume data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-5 max-w-vw mt-3">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-3 pr-8 font-medium text-gray-700"></th>
            <th className="text-center py-3 px-4 font-bold text-gray-700">
              Current Processing
              <br />
              Volumes MTD
            </th>
            <th className="text-center py-3 px-4 font-bold text-gray-700">
              Contractual Obligation
            </th>
            <th className="text-center py-3 px-4 font-bold text-gray-700">
              Completion Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {acquirers.map((acquirer) => (
            <tr key={acquirer.key} className="border-b border-gray-200">
              <td className="py-4 pr-8 font-medium">{acquirer.name}</td>
              <td className="text-center py-4 px-4">
                {acquirer.volume.toLocaleString()}
              </td>
              <td className="text-center py-4 px-4">
                {contractObligations[acquirer.key] || "-"}
              </td>
              <td className="text-center py-4 px-4 font-medium">
                {calculateCompletionRate(
                  acquirer.volume,
                  contractObligations[acquirer.key] || ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractualObligationTable;
