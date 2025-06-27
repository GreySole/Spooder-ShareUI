import { KeyedObject, Modal } from "@greysole/spooder-component-library";
import { useState } from "react";
import CommandModalContent from "./CommandModalContent";
import {
  MainMenuType,
  useShareMenu,
} from "../pluginSettings/context/MainMenuContext";

export default function CommandModal() {
  const { shareInfo, shareModalOpen, setShareModalOpen } = useShareMenu();

  return (
    <Modal
      title="Commands"
      content={<CommandModalContent commands={shareInfo.share.ommands} />}
      onClose={() => {
        setShareModalOpen(null);
      }}
      isOpen={shareModalOpen === MainMenuType.COMMANDS}
    />
  );
}
