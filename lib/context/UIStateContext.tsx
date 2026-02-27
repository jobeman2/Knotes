"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type MobileView = "list" | "editor";

interface UIStateContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeMobileView: MobileView;
  setActiveMobileView: (view: MobileView) => void;
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

export const UIStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeMobileView, setActiveMobileView] = useState<MobileView>("list");

  // Close sidebar on navigation / view change for mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeMobileView]);

  return (
    <UIStateContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        activeMobileView,
        setActiveMobileView,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (context === undefined) {
    throw new Error("useUIState must be used within a UIStateProvider");
  }
  return context;
};
