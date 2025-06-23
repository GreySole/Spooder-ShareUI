import { ReactNode } from "react";
import { usePluginSettingsContext } from "../context/PluginSettingsContext";
import PluginSubform from "../PluginSubform";
import PluginInputProcessor from "./PluginInputProcessor";

interface PluginInputsListProps {
  baseFormKey?: string;
}

export default function PluginInputsList({
  baseFormKey,
}: PluginInputsListProps) {
  const { form } = usePluginSettingsContext();

  return (
    <>
      {Object.keys(form).map((key) => {
        return (
          <>
            {form[key].type === "subform" ? (
              <PluginSubform key={`overform-${key}`} formKey={key} />
            ) : (
              <PluginInputProcessor
                key={key}
                formKey={baseFormKey ? `${baseFormKey}.${key}` : key}
              />
            )}
          </>
        );
      })}
    </>
  );
}
