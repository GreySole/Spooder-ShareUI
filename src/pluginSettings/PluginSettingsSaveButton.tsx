import {
  SaveButton,
  ToastType,
  useToast,
} from "@greysole/spooder-component-library";
import React from "react";
import { useFormContext } from "react-hook-form";
import { savePluginSettings } from "../Request";
import { usePluginSettingsContext } from "./context/PluginSettingsContext";

export default function PluginSettingsSaveButton() {
  const { getValues } = useFormContext();
  const { pluginName } = usePluginSettingsContext();
  const { showToast } = useToast();

  function saveSettings() {
    const newSettings = structuredClone(getValues());
    for (let key in newSettings) {
      if (newSettings[key]._name_changes) {
        for (let name in newSettings[key]._name_changes) {
          const newName = newSettings[key]._name_changes[name];
          newSettings[key][newName] = structuredClone(newSettings[key][name]);
          delete newSettings[key][name];
        }
        delete newSettings[key]._name_changes;
      }
    }
    savePluginSettings(pluginName, newSettings)
      .then(() => {
        showToast(
          `${pluginName} settings saved successfully!`,
          ToastType.SUCCESS
        );
      })
      .catch((error) => {
        showToast(
          `Failed to save ${pluginName} settings: ${error.message}`,
          ToastType.ERROR
        );
      });
  }

  return <SaveButton saveFunction={saveSettings} />;
}
