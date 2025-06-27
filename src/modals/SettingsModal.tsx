import { KeyedObject, Modal } from "@greysole/spooder-component-library";
import { useState } from "react";
import SettingsModalContent from "./SettingsModalContent";
import {
  MainMenuType,
  useShareMenu,
} from "../pluginSettings/context/MainMenuContext";

export default function SettingsModal() {
  const { shareInfo, shareModalOpen, setShareModalOpen } = useShareMenu();
  return (
    <Modal
      title="Settings"
      content={
        <SettingsModalContent
          settings={{
            name: shareInfo.share.name,
            joinMessage: shareInfo.share.joinMessage,
            leaveMessage: shareInfo.share.leaveMessage,
          }}
        />
      }
      onClose={() => {
        setShareModalOpen(null);
      }}
      isOpen={shareModalOpen === MainMenuType.SETTINGS}
    />
  );
}
