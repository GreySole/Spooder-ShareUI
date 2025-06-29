import {
  Box,
  Button,
  ToastProvider,
  ToastType,
  TooltipProvider,
  useToast,
} from "@greysole/spooder-component-library";
import { useFormContext } from "react-hook-form";
import { saveSharedCommands } from "../../Request";

function SaveButtonContent() {
  const { getValues } = useFormContext();
  const { showToast } = useToast();

  return (
    <Box width="100%" justifyContent="flex-end">
      <Button
        label="Save"
        onClick={() => {
          const values = getValues();
          saveSharedCommands(values)
            .then(() => {
              showToast("Commands saved successfully!", ToastType.SUCCESS);
            })
            .catch((error) => {
              showToast(
                `Failed to save commands: ${error.message}`,
                ToastType.ERROR
              );
            });
        }}
      />
    </Box>
  );
}

export default function CommandSaveButton() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <SaveButtonContent />
      </ToastProvider>
    </TooltipProvider>
  );
}
