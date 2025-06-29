import { Modal } from "@greysole/spooder-component-library";
import SettingsModalContent from "./SettingsModalContent";
import { useShareMenu } from "../pluginSettings/context/MainMenuContext";
import SettingsModalForm from "./form/SettingsModalForm";
import SettingsSaveButton from "./form/SettingsSaveButton";

export default function SettingsModal() {
  const { shareInfo, setShareModalOpen } = useShareMenu();
  return (
    <SettingsModalForm
      settings={{
        name: shareInfo.share.name,
        joinMessage: shareInfo.share.joinMessage,
        leaveMessage: shareInfo.share.leaveMessage,
      }}
    >
      <Modal
        title="Settings"
        content={<SettingsModalContent />}
        onClose={() => {
          setShareModalOpen(null);
        }}
        isOpen={true}
        footerContent={<SettingsSaveButton />}
      />
    </SettingsModalForm>
  );
}
