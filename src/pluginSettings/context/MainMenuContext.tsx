import React, { createContext, useContext, useState, ReactNode } from "react";
import MainMenu from "../../MainMenu";
import { KeyedObject } from "@greysole/spooder-component-library";
import { ShareObject } from "../../Types";

// Define the shape of the context value
type MainMenuContextType = {
  shareModalOpen: MainMenuType | null;
  setShareModalOpen: (type: MainMenuType | null) => void;
  ownerInfo: KeyedObject;
  shareInfo: KeyedObject;
};

export enum MainMenuType {
  COMMANDS = "commands",
  PLUGINS = "plugins",
  SETTINGS = "settings",
}

// Create the context with a default value (can be undefined for safety)
const MainMenuContext = createContext<MainMenuContextType | undefined>(
  undefined
);

interface MainMenuProviderProps {
  ownerInfo: KeyedObject;
  shareInfo: ShareObject;
  children: ReactNode;
}

// Provider component
export function MainMenuProvider(props: MainMenuProviderProps) {
  const { ownerInfo, shareInfo, children } = props;
  const [shareModalOpen, setShareModalOpen] = useState<MainMenuType | null>(
    null
  );

  console.log("MainMenuProvider", ownerInfo, shareInfo);

  return (
    <MainMenuContext.Provider
      value={{ ownerInfo, shareInfo, shareModalOpen, setShareModalOpen }}
    >
      {children}
    </MainMenuContext.Provider>
  );
}

// Custom hook for consuming the context
export const useShareMenu = () => {
  const context = useContext(MainMenuContext);
  if (!context) {
    throw new Error("useMainMenu must be used within a MainMenuProvider");
  }
  return context;
};
