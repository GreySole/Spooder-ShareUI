import React, { createContext, ReactNode, useContext, useState } from "react";
import SettingsForm from "../../pluginSettings/SettingsForm";
import PluginList from "../pluginModal/PluginList";
import { Modal } from "@greysole/spooder-component-library";
import {
  MainMenuType,
  useShareMenu,
} from "../../pluginSettings/context/MainMenuContext";

interface PluginModalContextType {
  plugins: { [key: string]: boolean };
  editModalPluginName: string;
  openEditModal: (pluginName: string) => void;
  closeEditModal: () => void;
  togglePlugin: (pluginName: string) => void;
}

interface PluginModalContextProps {
  plugins: { [key: string]: boolean };
}

const PluginModalContext = createContext<PluginModalContextType | null>(null);

export const usePluginModalContext = () => {
  const context = useContext(PluginModalContext);
  if (!context) {
    throw new Error(
      "usePluginModalContext must be used within a PluginModalContext.Provider"
    );
  }
  return context;
};

export default function PluginModalContextProvider(
  props: PluginModalContextProps
) {
  const { plugins: initialPlugins } = props;

  const { shareModalOpen, setShareModalOpen } = useShareMenu();

  console.log(initialPlugins);

  const [plugins, setPlugins] = useState(initialPlugins);
  const [editModalPluginName, setEditModalPluginName] = useState("");

  const openEditModal = (pluginName: string) => {
    setEditModalPluginName(pluginName);
  };

  const closeEditModal = () => {
    setEditModalPluginName("");
  };

  const togglePlugin = (pluginName: string) => {
    setPlugins((prev) => ({
      ...prev,
      [pluginName]: !prev[pluginName],
    }));
  };

  const value: PluginModalContextType = {
    plugins,
    editModalPluginName,
    openEditModal,
    closeEditModal,
    togglePlugin,
  };

  return (
    <PluginModalContext.Provider value={value}>
      {editModalPluginName ? (
        <SettingsForm pluginName={editModalPluginName} />
      ) : (
        <Modal
          content={<PluginList />}
          title="Plugins"
          onClose={() => setShareModalOpen(null)}
          isOpen={shareModalOpen === MainMenuType.PLUGINS}
        />
      )}
    </PluginModalContext.Provider>
  );
}
