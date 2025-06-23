import React from "react";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
import { Box, Button, useTheme } from "@greysole/spooder-component-library";

export default function CommandToggleGrid() {
  const { watch, setValue } = useFormContext();
  const chatCommands = watch();
  const { themeColors } = useTheme();

  const onToggleChange = (element: string, isSelected: boolean) => {
    setValue(element, isSelected);
  };

  const gridItems = Object.keys(chatCommands).map((element: string) => (
    <Box key={element} padding="small">
      <Button
        width="large"
        label={element}
        icon={faCommentDots}
        iconPosition="top"
        onClick={() => onToggleChange(element, !chatCommands[element])}
        color={
          chatCommands[element]
            ? themeColors.colorAnalogousCW
            : themeColors.buttonBackgroundColor
        }
        truncate
      />
    </Box>
  ));

  return <Box flexFlow="row wrap">{gridItems}</Box>;
}
