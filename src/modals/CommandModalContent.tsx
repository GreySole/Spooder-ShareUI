import { FormProvider, useForm } from "react-hook-form";
import CommandToggleGrid from "../input/CommandToggleGrid";

interface CommandModalContentProps {
  commands: { [key: string]: boolean };
}

export default function CommandModalContent(props: CommandModalContentProps) {
  const { commands } = props;
  const methods = useForm({
    defaultValues: commands,
  });
  return (
    <FormProvider {...methods}>
      <CommandToggleGrid />
    </FormProvider>
  );
}
