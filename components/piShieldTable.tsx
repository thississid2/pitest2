import { DayData } from "@/types";
import { formatDateString } from "@/utils/formatDate";
import {
  getTotalsForDate,
  groupByMonth,
  getLatestHour,
  renderHourCells,
} from "@/utils/piShieldTableUtils";

type TableProps = {
  data: DayData[];
  view: "Time" | "Date";
};

const PiShieldTable = ({ data, view }: TableProps) => {
  // Sort data by date descending
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Table column classes
  const glassColClass =
    "sticky left-0 z-10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 bg-white/30 min-w-[120px] p-2 font-semibold border border-muted";
  const whiteColClass =
    "sticky left-0 z-10 bg-white min-w-[120px] p-2 font-semibold border border-muted";

  // Use utility for grouping by month
  const groupedByMonth = view === "Date" ? groupByMonth(sortedData) : {};
  // Use utility for latest hour
  const latestHour = getLatestHour(sortedData, view);

  // Use utility for rendering hour cells
  // Removed unused variable renderHourCellsTd

  return (
    <div className="overflow-auto w-full py-5">
      <table className="w-max min-w-full border-collapse table-fixed">
        <thead>
          {view === "Time" ? (
            <>
              {/* Time View: Date Row */}
              <tr>
                <th className={glassColClass}>Date</th>
                {sortedData.map((day) => (
                  <th
                    key={`date-${day.date}`}
                    colSpan={latestHour + 1}
                    className="py-2 text-center min-w-[100px]"
                  >
                    {formatDateString(day.date, view)}
                  </th>
                ))}
              </tr>

              {/* Time View: Hour Labels */}
              <tr className="bg-accent">
                <th className={`${glassColClass} bg-accent/40`}>Time</th>
                {sortedData.map((day) => {
                  const is01 = new Date(day.date).getDate() === 1;

                  return Array.from({ length: latestHour + 1 })
                    .map((_, i) => latestHour - i)
                    .map((hour) => (
                      <th
                        key={`hour-${day.date}-${hour}`}
                        className={`p-2 text-center min-w-[100px] border border-muted ${
                          is01 && hour === 0
                            ? "border-r-2 border-card-foreground"
                            : ""
                        }`}
                      >
                        {`${hour}:00`}
                      </th>
                    ));
                })}
              </tr>
            </>
          ) : (
            <>
              {/* Date View: Month Header */}
              <tr>
                <th className={glassColClass}>Month</th>
                {Object.entries(groupedByMonth).map(([month, days]) => {
                  const has01 = days.some(
                    (d) => new Date(d.date).getDate() === 1
                  );
                  return (
                    <th
                      key={month}
                      colSpan={days.length}
                      className={`text-center py-2 min-w-[100px] border border-muted ${
                        has01 ? "border-r-2 border-card-foreground" : ""
                      }`}
                    >
                      {month}
                    </th>
                  );
                })}
              </tr>

              {/* Date View: Date Numbers */}
              <tr className="bg-accent">
                <th className={`${glassColClass} bg-accent/40`}>Date</th>
                {Object.values(groupedByMonth)
                  .flat()
                  .map((day, i, allDays) => {
                    const d = new Date(day.date);
                    const dayNum = String(d.getDate()).padStart(2, "0");
                    const is01 = d.getDate() === 1;
                    const isLast = i === allDays.length - 1;

                    return (
                      <th
                        key={`date-label-${i}`}
                        className={`p-2 text-center min-w-[100px] border border-muted ${
                          is01 && !isLast
                            ? "border-r-2 border-card-foreground"
                            : ""
                        }`}
                      >
                        {dayNum}
                      </th>
                    );
                  })}
              </tr>
            </>
          )}
        </thead>

        <tbody>
          {/* Total Transactions */}
          <tr>
            <th className={whiteColClass}>Total Transactions</th>
            {view === "Time"
              ? sortedData.flatMap((day) =>
                  renderHourCells(day, latestHour, "txn").map(
                    ({ val, hour, isBorder }) => (
                      <td
                        key={`txn-${day.date}-${hour}`}
                        className={`p-2 text-center min-w-[100px] ${
                          isBorder ? "border-r-2 border-card-foreground" : ""
                        }`}
                      >
                        {val}
                      </td>
                    )
                  )
                )
              : Object.values(groupedByMonth)
                  .flat()
                  .map((day, i, allDays) => {
                    const d = new Date(day.date);
                    const is01 = d.getDate() === 1;
                    const isLast = i === allDays.length - 1;

                    return (
                      <td
                        key={`txn-date-${day.date}`}
                        className={`p-2 text-center min-w-[100px] border border-muted ${
                          is01 && !isLast
                            ? "border-r-2 border-card-foreground"
                            : ""
                        }`}
                      >
                        {getTotalsForDate(day).txns}
                      </td>
                    );
                  })}
          </tr>

          {/* Fraud Count */}
          <tr className="bg-accent">
            <th className={`${glassColClass} bg-accent/40`}>No.of Frauds</th>
            {view === "Time"
              ? sortedData.flatMap((day) =>
                  renderHourCells(day, latestHour, "fraud").map(
                    ({ val, hour, isBorder }) => (
                      <td
                        key={`fraud-${day.date}-${hour}`}
                        className={`p-2 text-center min-w-[100px] ${
                          isBorder ? "border-r-2 border-card-foreground" : ""
                        }`}
                      >
                        {val}
                      </td>
                    )
                  )
                )
              : Object.values(groupedByMonth)
                  .flat()
                  .map((day, i, allDays) => {
                    const d = new Date(day.date);
                    const is01 = d.getDate() === 1;
                    const isLast = i === allDays.length - 1;

                    return (
                      <td
                        key={`fraud-date-${day.date}`}
                        className={`p-2 text-center min-w-[100px] border border-muted ${
                          is01 && !isLast
                            ? "border-r-2 border-card-foreground"
                            : ""
                        }`}
                      >
                        {getTotalsForDate(day).frds}
                      </td>
                    );
                  })}
          </tr>

          {/* Ratio */}
          <tr>
            <th className={whiteColClass}>Fraud to Sales Ratio</th>
            {view === "Time"
              ? sortedData.flatMap((day) =>
                  renderHourCells(day, latestHour, "ratio").map(
                    ({ val, hour, isBorder }) => (
                      <td
                        key={`ratio-${day.date}-${hour}`}
                        className={`p-2 text-center min-w-[100px] ${
                          isBorder ? "border-r-2 border-card-foreground" : ""
                        }`}
                      >
                        {val}
                      </td>
                    )
                  )
                )
              : Object.values(groupedByMonth)
                  .flat()
                  .map((day, i, allDays) => {
                    const d = new Date(day.date);
                    const is01 = d.getDate() === 1;
                    const isLast = i === allDays.length - 1;

                    return (
                      <td
                        key={`ratio-date-${day.date}`}
                        className={`p-2 text-center min-w-[100px] border border-muted ${
                          is01 && !isLast
                            ? "border-r-2 border-card-foreground"
                            : ""
                        }`}
                      >
                        {getTotalsForDate(day).ratio}
                      </td>
                    );
                  })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PiShieldTable;
