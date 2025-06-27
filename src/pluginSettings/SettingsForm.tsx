import React, { useEffect, useState } from "react";
import {
  Box,
  FormLoader,
  KeyedObject,
  PluginComponentProps,
  Stack,
} from "@greysole/spooder-component-library";
import PluginSettingsContextProvider from "./context/PluginSettingsContext";
import SettingsFormContextProvider from "./context/SettingsFormContext";
import { getPluginSettings } from "../Request";
import PluginInputsList from "./pluginInput/PluginInputsList";
import SettingsFormModal from "./SettingsFormModal";

export default function SettingsForm(props: PluginComponentProps) {
  const { pluginName } = props;

  const [pluginSettings, setPluginSettings] = useState<KeyedObject>();
  const [pluginSettingsForm, setPluginSettingsForm] = useState<KeyedObject>();

  useEffect(() => {
    getPluginSettings(pluginName).then((settings) => {
      setPluginSettings(settings.settings);
      setPluginSettingsForm(settings.form);
    });
  }, []);

  if (!pluginSettings || !pluginSettingsForm) {
    return <FormLoader numRows={4} />;
  }

  if (!pluginSettings || !pluginSettingsForm) {
    return null;
  }

  const values = Object.assign({}, pluginSettings);

  const form = pluginSettingsForm.form;
  const defaults = pluginSettingsForm.defaults;

  for (let d in defaults) {
    if (values[d] == null) {
      if (typeof defaults[d] == "object" && !Array.isArray(defaults[d])) {
        values[d] = {};
      } else if (typeof defaults[d] == "object" && Array.isArray(defaults[d])) {
        values[d] = [];
      } else {
        values[d] = defaults[d];
      }
    }
    if (Array.isArray(defaults[d]) && !Array.isArray(values[d])) {
      values[d] = [values[d]];
    } else if (!Array.isArray(defaults[d]) && Array.isArray(values[d])) {
      values[d] = values[d][0];
    }
  }

  return (
    <PluginSettingsContextProvider
      pluginName={pluginName}
      form={form}
      defaults={defaults}
    >
      <SettingsFormContextProvider values={values}>
        <SettingsFormModal />
      </SettingsFormContextProvider>
    </PluginSettingsContextProvider>
  );
}
