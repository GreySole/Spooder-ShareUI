import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

interface CommandModalContentProps {
  commands: { [key: string]: boolean };
  children: ReactNode;
}

export default function CommandsModalForm(props: CommandModalContentProps) {
  const { commands, children } = props;
  const methods = useForm({
    defaultValues: commands,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
