import { FormTextInput } from "@greysole/spooder-component-library";
import { useForm, FormProvider } from "react-hook-form";

interface SettingsModalContentProps {
  settings: { [key: string]: string };
}

export default function SettingsModalContent(props: SettingsModalContentProps) {
  const { settings } = props;
  const methods = useForm({
    defaultValues: settings,
  });
  return (
    <FormProvider {...methods}>
      <FormTextInput label="Name" formKey="name" />
      <FormTextInput label="Join Message" formKey="joinMessage" />
      <FormTextInput label="Leave Message" formKey="leaveMessage" />
    </FormProvider>
  );
}
