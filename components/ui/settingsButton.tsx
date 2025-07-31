import Link from "next/link";
import { Settings } from "lucide-react";

interface SettingsButtonProps {
  link: string;
}

const SettingsButton = ({ link }: SettingsButtonProps) => {
  return (
    <div className="absolute top-7 right-5 z-10">
      <Link href={link}>
        <button className="p-2 bg-accent hover:bg-accent/80 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center">
          <Settings size={20} />
        </button>
      </Link>
    </div>
  );
};

export default SettingsButton;
