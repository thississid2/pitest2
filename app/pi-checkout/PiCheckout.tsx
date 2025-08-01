"use client";

import { useState } from "react";
import { Eye, Filter, Search, TrendingUp, ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const templates = [
  {
    id: 1,
    name: "Modern Minimal",
    status: "active",
    description: "Clean and minimal checkout design with focus on conversion.",
    features: ["Mobile Optimized", "One-Click Payment"],
    conversion: "3.2%",
    modified: "2025-01-25",
    category: "minimal",
    type: "template",
    theme: "light"
  },
  {
    id: 2,
    name: "Professional Dark",
    status: "draft",
    description: "Dark theme checkout with professional styling.",
    features: ["Dark Mode", "Multi-Step", "Progress Indicator"],
    conversion: "2.8%",
    modified: "2025-01-24",
    category: "dark",
    type: "template",
    theme: "dark"
  },
  {
    id: 3,
    name: "Colorful Brand",
    status: "active",
    description: "Vibrant checkout design matching brand colors.",
    features: ["Brand Colors", "Custom Logo", "Trust Badges"],
    conversion: "3.5%",
    modified: "2025-01-23",
    category: "branded",
    type: "template",
    theme: "light"
  },
  {
    id: 4,
    name: "Express Checkout",
    status: "active",
    description: "Single-page express checkout for quick purchases.",
    features: ["Single Page", "Auto-Fill", "Quick Pay"],
    conversion: "4.1%",
    modified: "2025-01-22",
    category: "express",
    type: "template",
    theme: "light"
  },
];

const customizationOptions = [
  {
    id: 1,
    title: "Colors & Branding",
    description: "Customize colors, fonts, and branding",
    icon: "🎨",
    status: "available"
  },
  {
    id: 2,
    title: "Payment Methods",
    description: "Configure payment options",
    icon: "💳",
    status: "available"
  },
  {
    id: 3,
    title: "Layout & Fields",
    description: "Modify layout and form fields",
    icon: "📐",
    status: "available"
  },
  {
    id: 4,
    title: "Mobile Experience",
    description: "Optimize for mobile devices",
    icon: "📱",
    status: "available"
  }
];

const TemplatesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Templates");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleUseTemplate = (templateId: number, templateName: string) => {
    alert(`Using template: ${templateName}`);
    // Here you would typically redirect to the customization page or apply the template
  };

  const handlePreviewTemplate = (templateId: number, templateName: string) => {
    setSelectedTemplate(templateId);
    alert(`Previewing template: ${templateName}`);
    // Here you would typically open a modal with template preview
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setActiveFilter("All Templates");
    setSelectedCategory("all");
  };

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

    const matchesCategory = 
      selectedCategory === "all" || template.category === selectedCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  const avgConversionRate = "3.4%";
  const bestTemplate = "Express Checkout";
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter(t => t.status === "active").length;
  const draftTemplates = templates.filter(t => t.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg Conversion Rate</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{avgConversionRate}</span>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp size={16} />
                <span>0.5% from last month</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Best Performing</p>
            <div className="space-y-1">
              <span className="text-xl font-bold">{bestTemplate}</span>
              <p className="text-sm text-muted-foreground">4.1% conversion rate</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Templates</p>
            <div className="space-y-1">
              <span className="text-2xl font-bold">{totalTemplates}</span>
              <p className="text-sm text-muted-foreground">{activeTemplates} active, {draftTemplates} draft</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Template Performance Comparison */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Template Performance Comparison</h3>
          <p className="text-sm text-muted-foreground">Conversion rates by template over the last 30 days</p>
        </div>
        <div className="space-y-3">
          {templates.map((template) => (
            <div key={template.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{template.name}</span>
                <Badge 
                  className={cn(
                    "text-xs",
                    template.category === "minimal" && "bg-blue-100 text-blue-700",
                    template.category === "dark" && "bg-gray-100 text-gray-700",
                    template.category === "branded" && "bg-purple-100 text-purple-700",
                    template.category === "express" && "bg-green-100 text-green-700"
                  )}
                >
                  {template.category}
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-right">{template.conversion}</span>
                <Badge 
                  className={cn(
                    template.status === "active" 
                      ? "bg-green-500/20 text-green-700 border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                  )}
                >
                  {template.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/3">
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
        <div className="flex flex-wrap items-center space-x-2 gap-2">
          {["All Templates", "Active", "Draft"].map((filter) => (
            <Button
              key={filter}
              text={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "text-sm px-3 py-2",
                activeFilter === filter 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background border hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "All Categories" },
          { value: "minimal", label: "Minimal" },
          { value: "dark", label: "Dark Theme" },
          { value: "branded", label: "Branded" },
          { value: "express", label: "Express" }
        ].map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              selectedCategory === category.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            title={template.name}
            subtitle={template.description}
            className="group flex flex-col relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            headerContent={
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Badge
                    className={cn(
                      "text-xs",
                      template.category === "minimal" && "bg-blue-100 text-blue-700",
                      template.category === "dark" && "bg-gray-100 text-gray-700",
                      template.category === "branded" && "bg-purple-100 text-purple-700",
                      template.category === "express" && "bg-green-100 text-green-700"
                    )}
                  >
                    {template.category}
                  </Badge>
                </div>
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
            {/* Template Preview */}
            <div className="h-48 bg-gradient-to-br from-muted to-muted/50 rounded-md flex items-center justify-center mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="text-center z-10">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/30 transition-colors">
                  <Eye size={24} className="text-primary" />
                </div>
                <p className="text-sm font-medium">Template Preview</p>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  text="Preview" 
                  className="bg-white text-black hover:bg-gray-100" 
                  onClick={() => handlePreviewTemplate(template.id, template.name)}
                />
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {template.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>
                Conversion:{" "}
                <span className="text-foreground font-medium">
                  {template.conversion}
                </span>
              </span>
              <span>Modified: {template.modified}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <Button 
                text="Use Template" 
                className="flex-1 group-hover:bg-primary/90 transition-colors" 
                onClick={() => handleUseTemplate(template.id, template.name)}
              />
              <button 
                className="p-2 border rounded-md hover:bg-muted transition-colors hover:border-primary"
                onClick={() => handlePreviewTemplate(template.id, template.name)}
              >
                <Eye size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters.
          </p>
          <Button text="Clear Filters" onClick={handleClearFilters} />
        </div>
      )}
    </div>
  );
};

const CustomizationView = () => {
  const handleCustomizeOption = (optionTitle: string) => {
    alert(`Opening ${optionTitle} customization panel`);
    // Here you would typically open the specific customization modal or navigate to that section
  };

  const [selectedDevice, setSelectedDevice] = useState("Desktop");

  return (
    <div className="space-y-8">
      {/* Customization Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {customizationOptions.map((option) => (
          <Card key={option.id} className="p-8 hover:shadow-lg transition-shadow group">
            <div className="flex items-start space-x-4">
              <div className="text-4xl group-hover:scale-110 transition-transform">{option.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-muted-foreground mb-4">{option.description}</p>
                <Button 
                  text="Customize" 
                  className="w-full" 
                  onClick={() => handleCustomizeOption(option.title)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Live Preview Section */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
        <p className="text-muted-foreground mb-6">See how your checkout will look on different devices</p>
        
        <div className="flex justify-center space-x-4 mb-6">
          {["Desktop", "Tablet", "Mobile"].map((device) => (
            <button
              key={device}
              onClick={() => setSelectedDevice(device)}
              className={cn(
                "px-4 py-2 rounded-md border transition-colors",
                selectedDevice === device 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "hover:bg-muted"
              )}
            >
              {device}
            </button>
          ))}
        </div>

        <div className="h-96 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="text-center z-10">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye size={32} className="text-primary" />
            </div>
            <h4 className="text-lg font-medium mb-2">Live Preview - {selectedDevice}</h4>
            <p className="text-muted-foreground">Select a template to see preview</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const PerformanceView = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30 days");
  const [selectedMetric, setSelectedMetric] = useState("conversion");

  return (
    <div className="space-y-8">
      {/* Time Range and Metric Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <div className="flex space-x-4">
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7 days">Last 7 days</option>
            <option value="30 days">Last 30 days</option>
            <option value="90 days">Last 90 days</option>
            <option value="1 year">Last year</option>
          </select>
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="conversion">Conversion Rate</option>
            <option value="revenue">Revenue</option>
            <option value="sessions">Sessions</option>
            <option value="abandonment">Abandonment Rate</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg Conversion Rate</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">3.4%</span>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp size={16} />
                <span>+0.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">vs last {selectedTimeRange}</p>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Checkouts</p>
            <span className="text-2xl font-bold">12,847</span>
            <p className="text-xs text-green-600">+15.3% increase</p>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Successful Payments</p>
            <span className="text-2xl font-bold">11,203</span>
            <p className="text-xs text-green-600">+18.2% increase</p>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Abandonment Rate</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">12.8%</span>
              <div className="flex items-center text-red-600 text-sm">
                <TrendingUp size={16} />
                <span>-1.2%</span>
              </div>
            </div>
            <p className="text-xs text-green-600">Improvement from last period</p>
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Conversion Trends</h3>
          <p className="text-sm text-muted-foreground">Template performance over {selectedTimeRange}</p>
        </div>
        
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="text-center z-10">
            <TrendingUp size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Performance chart for {selectedMetric} will be displayed here</p>
            <p className="text-sm text-muted-foreground mt-2">Time range: {selectedTimeRange}</p>
          </div>
        </div>
      </Card>

      {/* Template Comparison */}
      <Card className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Template Comparison</h3>
          <p className="text-muted-foreground">Compare performance across all templates</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Template</th>
                <th className="text-left py-3 px-4">Conversion Rate</th>
                <th className="text-left py-3 px-4">Total Sessions</th>
                <th className="text-left py-3 px-4">Revenue</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{template.name}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold">{template.conversion}</span>
                  </td>
                  <td className="py-3 px-4">{Math.floor(Math.random() * 5000 + 1000).toLocaleString()}</td>
                  <td className="py-3 px-4">${Math.floor(Math.random() * 50000 + 10000).toLocaleString()}</td>
                  <td className="py-3 px-4">
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
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const PiCheckout = () => {
  const [activeTab, setActiveTab] = useState("Templates");
  const [showFilters, setShowFilters] = useState(false);

  const handleNewTemplate = () => {
    alert("Opening new template creation wizard...");
    // Here you would typically navigate to a template creation page or open a modal
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold mb-2">Checkout Designs</h1>
          <p className="text-muted-foreground text-lg">
            Create and customize checkout templates to optimize conversions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border rounded-lg text-sm hover:bg-muted transition-colors"
          >
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <Button text="+ New Template" className="px-6 py-2" onClick={handleNewTemplate} />
        </div>
      </div>

      {/* Global Filter Panel */}
      {showFilters && (
        <Card className="p-6 mb-8 border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select className="w-full p-2 border rounded-md">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Performance</label>
              <select className="w-full p-2 border rounded-md">
                <option>All Performance</option>
                <option>High (&gt;3.5%)</option>
                <option>Medium (2-3.5%)</option>
                <option>Low (&lt;2%)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Modified</label>
              <select className="w-full p-2 border rounded-md">
                <option>Any Time</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      <div>
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {["Templates", "Customization", "Performance"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
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
        <div className="mt-8">
          {activeTab === "Templates" && <TemplatesView />}
          {activeTab === "Customization" && <CustomizationView />}
          {activeTab === "Performance" && <PerformanceView />}
        </div>
      </div>
    </div>
  );
};

export default PiCheckout;
