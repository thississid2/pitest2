"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  Music,
  ChartColumnBigIcon,
  Settings,
  UserCircle,
  LayoutDashboard,
  CreditCardIcon,
  GitBranch,
  Users,
  CircleQuestionMark,
  FileSliders,
  LucideIcon,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ProductsCard from "@/components/productsCard";
import { useSidebar } from "./sidebarContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const [showToggle, setShowToggle] = useState(false);
  const [togglePosition, setTogglePosition] = useState({ x: 0, y: 0 });
  const [cooldown, setCooldown] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cooldown) return;
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const rect = sidebar.getBoundingClientRect();
      const edgeZone = 12;
      const isAtEdge =
        e.clientX >= rect.right - edgeZone &&
        e.clientX <= rect.right + edgeZone;

      if (isAtEdge) {
        setTogglePosition({ x: e.clientX, y: e.clientY });
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [collapsed, cooldown]);

  const handleToggle = () => {
    setCollapsed(!collapsed);
    setShowToggle(false);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 400);
  };

  const renderNavItem = (
    title: string,
    href: string,
    icon: LucideIcon,
    desc?: string
  ) => {
    const selected = pathname === href;
    const card = (
      <ProductsCard
        title={title}
        desc={desc || ""}
        href={href}
        icon={icon}
        collapsed={collapsed}
        selected={selected}
      />
    );

    return collapsed ? (
      <Tooltip key={title}>
        <TooltipTrigger asChild>
          <div>{card}</div>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    ) : (
      <div key={title}>{card}</div>
    );
  };

  const Divider = () => (
    <div className={cn(collapsed ? "border-t border-foreground" : "")} />
  );

  return (
    <TooltipProvider>
      {showToggle && (
        <div
          className="fixed z-50"
          style={{
            top: `${togglePosition.y - 16}px`,
            left: `${togglePosition.x - 16}px`,
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleToggle}
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground shadow-md flex items-center justify-center"
              >
                {collapsed ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {collapsed ? "Expand sidebar" : "Collapse sidebar"}
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      <div
        ref={sidebarRef}
        className={cn(
          "flex flex-col bg-sidebar shadow-[0_0px_20px_#00000020] max-h-screen sticky top-0 left-0 z-40",
          collapsed ? "w-15 items-center" : "w-64"
        )}
      >
        <div className="p-3 shadow-sm">
          {!collapsed ? (
            <>
              <Image
                src="/pi-logo.svg"
                alt="Pi Logo"
                width={170}
                height={40}
                className="mb-4"
              />
              <div>
                <h2 className="font-bold text-xl">Client Hub</h2>
                <p className="text-sm opacity-70">Merchant Portal</p>
              </div>
              <div className="h-0.5 bg-black mt-3 w-45" />
            </>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <span className="font-bold text-sm">Pi</span>
              <div className="h-0.5 bg-black w-6 mt-2 mb-2" />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          <div>
            {!collapsed && <h2 className="font-bold mb-2 text-lg">Main</h2>}
            <div className="flex flex-col gap-1.5">
              {renderNavItem(
                "Dashboard",
                "/",
                LayoutDashboard,
                "Real-time metrics and KPIs"
              )}
              {renderNavItem(
                "Analytics 360",
                "/pi-analytics",
                ChartColumnBigIcon,
                "Comprehensive data insights"
              )}
              {renderNavItem(
                "Checkout Designs",
                "/pi-checkout",
                CreditCardIcon,
                "Template gallery and customization"
              )}
              {renderNavItem(
                "API Integrations",
                "/pi-APIIntegration",
                Search,
                "Payment provider management"
              )}
            </div>
          </div>

          <Divider />

          <div>
            {!collapsed && <h2 className="font-bold mb-2 text-lg">Products</h2>}
            <div className="flex flex-col gap-1.5">
              {renderNavItem(
                "Pi Symphony",
                "/pi-symphony",
                Music,
                "AI-Powered data analysis"
              )}
              {renderNavItem(
                "Pi Shield",
                "/pi-shield",
                Shield,
                "Fraud Protection and Security"
              )}
              {renderNavItem(
                "Pi Recon",
                "/pi-recon",
                GitBranch,
                "Reconciliation and Settlement Tools"
              )}
              {renderNavItem(
                "Pi Deepsearch",
                "/pi-deepsearch",
                Search,
                "Business AI Chat"
              )}
            </div>
          </div>

          <Divider />

          <div>
            {!collapsed && (
              <h2 className="font-bold mb-2 text-lg">Management</h2>
            )}
            <div className="flex flex-col gap-1.5">
              {renderNavItem(
                "User Management",
                "/user-management",
                Users,
                "User management and roles"
              )}
              {renderNavItem(
                "Help & Support",
                "/help-and-support",
                CircleQuestionMark,
                "Help center and support tickets"
              )}
              {renderNavItem(
                "Documentation",
                "/documentation",
                FileSliders,
                "Comprehensive Documentation"
              )}
            </div>
          </div>
        </div>

        <Divider />

        <div className="p-3">
          <div className="flex flex-col gap-1.5">
            {renderNavItem("Settings", "/settings", Settings)}
            {renderNavItem("Profile", "/profile", UserCircle)}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
