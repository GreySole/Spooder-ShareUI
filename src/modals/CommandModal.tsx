import { Box, Modal } from "@greysole/spooder-component-library";
import CommandModalContent from "./CommandModalContent";
import { useShareMenu } from "../pluginSettings/context/MainMenuContext";
import CommandsModalForm from "./form/CommandModalForm";
import CommandSaveButton from "./form/CommandSaveButton";

export default function CommandModal() {
  const { shareInfo, setShareModalOpen } = useShareMenu();

  return (
    <CommandsModalForm commands={shareInfo.share.commands}>
      <Modal
        title="Commands"
        content={<CommandModalContent />}
        onClose={() => {
          setShareModalOpen(null);
        }}
        isOpen={true}
        footerContent={
          <Box width="100%" justifyContent="flex-end">
            <CommandSaveButton />
          </Box>
        }
      />
    </CommandsModalForm>
  );
}
