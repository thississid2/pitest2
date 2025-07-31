import { createContext, useContext, useState } from "react";

// this will send the state of the sidebar whether it's collapsed or not throughout the project
// wherever i use useSidebar()

// creating the context
const SidebarContext = createContext<{collapsed: boolean; setCollapsed: (v: boolean) => void;}>({
  collapsed: false,
  setCollapsed: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);