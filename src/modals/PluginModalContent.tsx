import { useEffect, useState } from "react";
import { getSharedPlugins } from "../Request";
import {
  BoolSwitch,
  Border,
  Box,
  Button,
  Icon,
  KeyedObject,
  Stack,
  TypeFace,
} from "@greysole/spooder-component-library";
import { faGear } from "@fortawesome/free-solid-svg-icons";

interface PluginModalContentProps {
  plugins: { [key: string]: boolean };
}

export default function PluginModalContent(props: PluginModalContentProps) {
  const { plugins } = props;
  const [sharedPlugins, setSharedPlugins] = useState<KeyedObject>({});
  useEffect(() => {
    getSharedPlugins().then((pluginData) => {
      setSharedPlugins(pluginData);
    });
  }, []);
  console.log("PluginModalContent", plugins);
  return (
    <Stack spacing="medium" padding="small">
      {Object.keys(sharedPlugins).map((pluginName) => {
        const isEnabled = plugins[pluginName] ?? false;
        console.log(pluginName, isEnabled);
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
                <BoolSwitch
                  label="Enabled"
                  value={isEnabled}
                  onChange={(value) => {}}
                />
                <Box>
                  <Button icon={faGear} iconSize="large" onClick={() => {}} />
                </Box>
              </Stack>
            </Box>
          </Border>
        );
      })}
    </Stack>
  );
}
