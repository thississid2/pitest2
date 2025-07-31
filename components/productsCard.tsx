import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsCardProps {
  title: string;
  desc: string;
  href: string;
  selected?: boolean;
  icon?: LucideIcon;
  collapsed: boolean;
}

const ProductsCard: React.FC<ProductsCardProps> = ({
  title,
  desc,
  href,
  selected,
  icon: Icon,
  collapsed,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg transition-all duration-150",
        collapsed
          ? cn(
              "w-10 h-10 flex items-center justify-center mx-auto",
              selected
                ? "bg-accent text-foreground shadow-inner"
                : "hover:bg-accent text-foreground"
            )
          : cn(
              "flex items-center gap-3 p-2 w-full",
              selected
                ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                : "hover:bg-accent text-foreground"
            )
      )}
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {!collapsed && (
        <div className="flex flex-col justify-center">
          <div className="text-sm font-medium leading-tight">{title}</div>
          {desc && <div className="text-xs">{desc}</div>}
        </div>
      )}
    </Link>
  );
};

export default ProductsCard;
