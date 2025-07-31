"use client";

import { useState } from "react";
import { Eye, Filter, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const templates = [
  {
    name: "Modern Minimal",
    status: "active",
    description: "Clean and minimal checkout design with focus on conversion.",
    features: ["Mobile Optimized", "One-Click Payment"],
    conversion: "3.2%",
    modified: "2025-01-25",
  },
  {
    name: "Professional Dark",
    status: "draft",
    description: "Dark theme checkout with professional styling.",
    features: ["Dark Mode", "Multi-Step", "Progress Indicator"],
    conversion: "2.8%",
    modified: "2025-01-24",
  },
  {
    name: "Colorful Brand",
    status: "active",
    description: "Vibrant checkout design matching brand colors.",
    features: ["Brand Colors", "Custom Logo", "Trust Badges"],
    conversion: "3.5%",
    modified: "2025-01-23",
  },
  {
    name: "Express Checkout",
    status: "active",
    description: "Single-page express checkout for quick purchases.",
    features: ["Single Page", "Auto-Fill", "Quick Pay"],
    conversion: "4.1%",
    modified: "2025-01-22",
  },
];

const TemplatesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Templates");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      activeFilter === "All Templates" ||
      (activeFilter === "Active" && template.status === "active") ||
      (activeFilter === "Draft" && template.status === "draft");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Buttons */}
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          {["All Templates", "Active", "Draft"].map((filter) => (
            <Button
              key={filter}
              text={filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.name}
            title={template.name}
            subtitle={template.description}
            className="flex flex-col"
            headerContent={
              <div className="flex justify-end">
                <Badge
                  className={cn(
                    template.status === "active" &&
                      "bg-green-500/20 text-green-700 border-green-500/30",
                    template.status === "draft" &&
                      "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                  )}
                >
                  {template.status}
                </Badge>
              </div>
            }
          >
            <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
              <p className="text-muted-foreground">Template Preview</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {template.features.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>
                Conversion:{" "}
                <span className="text-foreground font-medium">
                  {template.conversion}
                </span>
              </span>
              <span>Modified: {template.modified}</span>
            </div>
            <div className="flex justify-between items-center">
              <Button text="Use Template" className="w-full mr-2" />
              <button className="p-2 border rounded-md hover:bg-muted">
                <Eye size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No templates found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

const PiCheckout = () => {
  const [activeTab, setActiveTab] = useState("Templates");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Checkout Designs</h1>
          <p className="text-muted-foreground">
            Create and customize checkout templates to optimize conversions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border rounded-lg text-sm hover:bg-muted">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <Button text="+ New Template" />
        </div>
      </div>

      <div>
        <div className="border-b">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {["Templates", "Customization", "Performance"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-6">
          {activeTab === "Templates" && <TemplatesView />}
          {activeTab === "Customization" && (
            <div className="text-center py-12 text-muted-foreground">
              Customization view coming soon.
            </div>
          )}
          {activeTab === "Performance" && (
            <div className="text-center py-12 text-muted-foreground">
              Performance view coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PiCheckout;
