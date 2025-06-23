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
import CommandModalContent from "./modals/CommandModalContent";
import PluginModalContent from "./modals/PluginModalContent";
import SettingsModalContent from "./modals/SettingsModalContent";
import { useState } from "react";

interface MainMenuProps {
  ownerInfo: KeyedObject;
  shareInfo: ShareObject;
}

export default function MainMenu(props: MainMenuProps) {
  const { ownerInfo, shareInfo } = props;
  const [commandModalOpen, setCommandModalOpen] = useState(false);
  const [pluginModalOpen, setPluginModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  console.log("MainMenu", ownerInfo, shareInfo);
  const share = shareInfo.share as ShareUser;
  const commandCount = Object.keys(share.commands).length;
  const pluginCount = Object.keys(share.plugins).length;

  return (
    <Stack spacing="small" align="center">
      <Modal
        title="Commands"
        content={<CommandModalContent commands={share.commands} />}
        onClose={() => {
          setCommandModalOpen(false);
        }}
        isOpen={commandModalOpen}
      />
      <Modal
        title="Plugins"
        content={<PluginModalContent plugins={share.plugins} />}
        onClose={() => {
          setPluginModalOpen(false);
        }}
        isOpen={pluginModalOpen}
      />
      <Modal
        title="Settings"
        content={
          <SettingsModalContent
            settings={{
              name: share.name,
              joinMessage: share.joinMessage,
              leaveMessage: share.leaveMessage,
            }}
          />
        }
        onClose={() => {
          setSettingsModalOpen(false);
        }}
        isOpen={settingsModalOpen}
      />
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
            onClick={() => setCommandModalOpen(true)}
          />
        </Box>
        <Box padding="small">
          <Button
            icon={faPlug}
            label="Plugins"
            onClick={() => setPluginModalOpen(true)}
          />
        </Box>

        <Box padding="small">
          <Button
            icon={faGear}
            label="Settings"
            onClick={() => setSettingsModalOpen(true)}
          />
        </Box>
      </Box>
    </Stack>
  );
}
