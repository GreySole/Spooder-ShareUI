import React, { useEffect, useState } from "react";
import {
  Box,
  CircleLoader,
  CustomSpooder,
  KeyedObject,
  Stack,
  TypeFace,
} from "@greysole/spooder-component-library";
import { getShareUser } from "./Request";
import { ShareObject, ShareUser } from "./Types";
import MainMenu from "./MainMenu";
import Header from "./Header";

export default function App() {
  const [shareUserData, setShareUserData] = useState<ShareObject | undefined>();
  const [ownerData, setOwnerData] = useState<KeyedObject | undefined>();
  const [statusText, setStatusText] = useState("Getting your share data...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getShareUser()
      .then((data) => {
        setOwnerData(data.owner);
        if (data.error) {
          setStatusText(
            (data.error + "!" ||
              "An error occurred while fetching share data.") +
              ` Contact the owner: ${data.owner.ownerName} for help.`
          );
          setIsLoading(false);
          return;
        }
        setShareUserData(data.share);
      })
      .catch((e) => {
        setStatusText(e);
      });
  }, []);

  return (
    <Box flexFlow="column" width="100vw" height="100dvh">
      <Header ownerInfo={ownerData} shareInfo={shareUserData} />
      <Box
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing="medium" align="center">
          <CustomSpooder />
          {shareUserData && ownerData ? (
            <MainMenu ownerInfo={ownerData} shareInfo={shareUserData} />
          ) : (
            <Stack spacing="small" align="center">
              <TypeFace fontSize="large">{statusText}</TypeFace>
              {isLoading ? (
                <Box>
                  <CircleLoader />
                </Box>
              ) : null}
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
