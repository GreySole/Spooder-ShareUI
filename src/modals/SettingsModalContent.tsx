import { FormTextInput, Stack } from "@greysole/spooder-component-library";
import { useForm, FormProvider } from "react-hook-form";

export default function SettingsModalContent() {
  return (
    <Stack spacing="medium">
      <FormTextInput label="Name" formKey="name" />
      <FormTextInput label="Join Message" formKey="joinMessage" />
      <FormTextInput label="Leave Message" formKey="leaveMessage" />
    </Stack>
  );
}
