import { cn } from "@/lib/utils";

interface ToggleProps {
  value: string;
  options: [string, string]; // e.g. ["Time", "Date"]
  onChange: (val: string) => void;
  className?: string;
}

const Toggle = ({ value, options, onChange, className }: ToggleProps) => {
  return (
    <div className={cn("", className)}>
      <div className="inline-flex rounded-md shadow-sm overflow-hidden">
        {options.map((option, idx) => (
          <label key={option}>
            <input
              type="radio"
              name="toggle"
              className="sr-only peer"
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span
              className={`peer-checked:bg-accent peer-checked:text-card-foreground peer-checked:z-10 peer-checked:shadow-[0_0_0_1px_var(--muted-foreground)] 
                bg-white px-2 py-1 md:px-4 md:py-2 text-sm text-[#3e4963] shadow-[0_0_0_1px_#b5bfd9] text-center transition-colors duration-300 cursor-pointer
                ${idx === 0 ? "first:rounded-l-md" : ""} ${
                idx === options.length - 1 ? "last:rounded-r-md" : ""
              }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
