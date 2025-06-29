import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

interface SettingsModalContentProps {
  settings: { [key: string]: string };
  children: ReactNode;
}

export default function SettingsModalForm(props: SettingsModalContentProps) {
  const { settings, children } = props;
  const methods = useForm({
    defaultValues: settings,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
