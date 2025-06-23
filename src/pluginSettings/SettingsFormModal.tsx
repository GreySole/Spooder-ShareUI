import { Box, Modal, Stack } from "@greysole/spooder-component-library";
import PluginSettingsSaveButton from "./PluginSettingsSaveButton";
import { usePluginSettingsContext } from "./context/PluginSettingsContext";
import PluginInputsList from "./pluginInput/PluginInputsList";

interface SettingsFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SettingsFormModal(props: SettingsFormModalProps) {
  const { isOpen, setIsOpen } = props;
  const { pluginName } = usePluginSettingsContext();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
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
