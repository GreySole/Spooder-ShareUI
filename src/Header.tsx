import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Box,
  CustomSpooder,
  Icon,
  KeyedObject,
  TypeFace,
  useTheme,
} from "@greysole/spooder-component-library";
import { ShareObject } from "./Types";

interface MainMenuProps {
  ownerInfo: KeyedObject | undefined;
  shareInfo: ShareObject | undefined;
}

export default function Header(props: MainMenuProps) {
  const { ownerInfo, shareInfo } = props;
  return (
    <Box
      className="top-header"
      width="100%"
      flexFlow="column"
      justifyContent="center"
    >
      <Box
        className="navigation-bar"
        flexFlow="row nowrap"
        width="100%"
        height="var(--header-height)"
        backgroundColor="var(--color-background-far)"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft="small"
        paddingRight="small"
      >
        <TypeFace fontSize="large">{`${shareInfo?.share.name} @ ${ownerInfo?.botName}`}</TypeFace>
        <CustomSpooder />
      </Box>
    </Box>
  );
}
