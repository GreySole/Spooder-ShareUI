import {
  Box,
  Button,
  ToastProvider,
  ToastType,
  TooltipProvider,
  useToast,
} from "@greysole/spooder-component-library";
import { saveShareSettings } from "../../Request";
import { useFormContext } from "react-hook-form";

function SaveButtonContent() {
  const { getValues } = useFormContext();
  const { showToast } = useToast();

  return (
    <Box width="100%" justifyContent="flex-end">
      <Button
        label="Save"
        onClick={() => {
          const values = getValues();
          saveShareSettings(values)
            .then(() => {
              showToast("Settings saved successfully!", ToastType.SUCCESS);
            })
            .catch((error) => {
              showToast(
                `Failed to save settings: ${error.message}`,
                ToastType.ERROR
              );
            });
        }}
      />
    </Box>
  );
}

export default function SettingsSaveButton() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <SaveButtonContent />
      </ToastProvider>
    </TooltipProvider>
  );
}
