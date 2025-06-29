import { faClipboard, faGear } from "@fortawesome/free-solid-svg-icons";
import {
  KeyedObject,
  Stack,
  Border,
  Box,
  Icon,
  TypeFace,
  BoolSwitch,
  Button,
  Columns,
  LinkButton,
} from "@greysole/spooder-component-library";
import { useState, useEffect } from "react";
import { getSharedPlugins } from "../../Request";
import { usePluginModalContext } from "../context/PluginModalContext";

export default function PluginList() {
  const { plugins, togglePlugin, openEditModal } = usePluginModalContext();
  const [sharedPlugins, setSharedPlugins] = useState<KeyedObject>({});
  useEffect(() => {
    getSharedPlugins().then((pluginData) => {
      setSharedPlugins(pluginData);
    });
  }, []);

  function generateOverlayLink(
    type: "overlay" | "utility",
    pluginName: string
  ): string {
    const host = window.location.host;
    const key = new URLSearchParams(window.location.search).get("key");

    return `${host}/${type}/${pluginName}?key=${key}`;
  }

  return (
    <Stack spacing="medium" padding="small">
      {Object.keys(sharedPlugins).map((pluginName) => {
        const isEnabled = plugins[pluginName] ?? false;
        return (
          <Border borderBottom>
            <Box
              key={pluginName}
              flexFlow="row"
              justifyContent="space-between"
              padding="small"
            >
              <Box flexFlow="row">
                <Icon
                  icon={"/icons/" + sharedPlugins[pluginName].dirname + ".png"}
                  iconSize="5rem"
                />
                <Stack spacing="small" paddingLeft="small">
                  <TypeFace fontSize="large">
                    {sharedPlugins[pluginName].name}
                  </TypeFace>
                  <TypeFace fontSize="medium">
                    {sharedPlugins[pluginName].version}
                  </TypeFace>
                </Stack>
              </Box>
              <Stack spacing="small" align="right">
                {" "}
                <BoolSwitch
                  label="Enabled"
                  value={isEnabled}
                  onChange={(value) => togglePlugin(pluginName)}
                />
                <Columns spacing="medium">
                  {sharedPlugins[pluginName].hasOverlay ? (
                    <LinkButton
                      mode="copy"
                      label="Overlay"
                      iconSize="large"
                      link={generateOverlayLink("overlay", pluginName)}
                    />
                  ) : null}
                  {sharedPlugins[pluginName].hasUtility ? (
                    <LinkButton
                      mode="newtab"
                      label="Utility"
                      iconSize="large"
                      link={generateOverlayLink("utility", pluginName)}
                    />
                  ) : null}
                  <Button
                    icon={faGear}
                    iconSize="large"
                    onClick={() => openEditModal(pluginName)}
                  />
                </Columns>
              </Stack>
            </Box>
          </Border>
        );
      })}
    </Stack>
  );
}
