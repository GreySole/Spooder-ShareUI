import { Box, Modal, Stack } from "@greysole/spooder-component-library";
import PluginSettingsSaveButton from "./PluginSettingsSaveButton";
import { usePluginSettingsContext } from "./context/PluginSettingsContext";
import PluginInputsList from "./pluginInput/PluginInputsList";
import { MainMenuType, useShareMenu } from "./context/MainMenuContext";
import { usePluginModalContext } from "../modals/context/PluginModalContext";

export default function SettingsFormModal() {
  const { pluginName } = usePluginSettingsContext();
  const { editModalPluginName, closeEditModal } = usePluginModalContext();
  const { shareModalOpen, setShareModalOpen } = useShareMenu();

  return (
    <Modal
      isOpen={pluginName === editModalPluginName}
      onClose={() => {
        closeEditModal();
      }}
      title={pluginName}
      content={
        <Box flexFlow="column" padding="medium">
          <Stack spacing="medium">
            <PluginInputsList />
          </Stack>
        </Box>
      }
      footerContent={
        <Box width="100%" justifyContent="flex-end">
          <PluginSettingsSaveButton />
        </Box>
      }
    />
  );
}
