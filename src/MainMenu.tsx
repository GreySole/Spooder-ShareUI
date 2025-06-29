import {
  Box,
  Button,
  KeyedObject,
  Modal,
  Stack,
  TypeFace,
} from "@greysole/spooder-component-library";
import { ShareObject, ShareUser } from "./Types";
import {
  faCommentDots,
  faGear,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CommandModal from "./modals/CommandModal";
import PluginModal from "./modals/PluginModal";
import SettingsModal from "./modals/SettingsModal";
import {
  MainMenuType,
  useShareMenu,
} from "./pluginSettings/context/MainMenuContext";

export default function MainMenu() {
  const { ownerInfo, shareInfo, shareModalOpen, setShareModalOpen } =
    useShareMenu();

  console.log("MainMenu", ownerInfo, shareInfo);
  const share = shareInfo.share as ShareUser;
  const commandCount = Object.keys(share.commands).length;
  const pluginCount = Object.keys(share.plugins).length;

  return (
    <Stack spacing="small" align="center">
      {shareModalOpen === MainMenuType.COMMANDS ? <CommandModal /> : null}
      {shareModalOpen === MainMenuType.PLUGINS ? <PluginModal /> : null}
      {shareModalOpen === MainMenuType.SETTINGS ? <SettingsModal /> : null}
      <TypeFace fontSize="large">Welcome {share.name}!</TypeFace>
      <TypeFace>
        {ownerInfo.ownerName} shared{" "}
        {commandCount > 0 ? `${commandCount} commands` : ""}
        {commandCount > 0 && pluginCount > 0 ? " and " : ""}
        {pluginCount > 0 ? `${pluginCount} plugins` : ""} with you.
      </TypeFace>
      <Box flexFlow="row" width="100%" justifyContent="space-evenly">
        <Box padding="small">
          <Button
            icon={faCommentDots}
            label="Commands"
            onClick={() => setShareModalOpen(MainMenuType.COMMANDS)}
          />
        </Box>
        <Box padding="small">
          <Button
            icon={faPlug}
            label="Plugins"
            onClick={() => setShareModalOpen(MainMenuType.PLUGINS)}
          />
        </Box>

        <Box padding="small">
          <Button
            icon={faGear}
            label="Settings"
            onClick={() => setShareModalOpen(MainMenuType.SETTINGS)}
          />
        </Box>
      </Box>
    </Stack>
  );
}
