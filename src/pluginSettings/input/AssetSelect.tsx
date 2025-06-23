import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  KeyedObject,
  SelectDropdown,
} from "@greysole/spooder-component-library";
import { getPluginAssets, uploadPluginAsset } from "../../Request";

interface AssetSelectProps {
  label?: string;
  assetType?: string;
  pluginName: string;
  assetFolderPath: string;
  value: string;
  onChange: (value: string) => void;
}

export default function AssetSelect(props: AssetSelectProps) {
  const { label, assetType, pluginName, assetFolderPath, value, onChange } =
    props;
  const acceptedFormat = assetType != null ? assetType + "/*" : "*";

  const [assets, setAssets] = useState<KeyedObject>();

  useEffect(() => {
    getPluginAssets(pluginName, assetFolderPath).then((assetData) => {
      setAssets(assetData.dirs);
    });
  }, []);

  const fileRef = useRef<HTMLInputElement>(null);

  const assetOptions = [{ label: "None", value: "" }];
  for (let a in assets) {
    assetOptions.push({
      label: assets[a].substring(assets[a].lastIndexOf("/") + 1),
      value: assets[a],
    });
  }

  async function uploadAsset(files: FileList | null) {
    if (files && files.length > 0) {
      await uploadPluginAsset(pluginName, assetFolderPath, files);
      getPluginAssets(pluginName, assetFolderPath).then((assetData) => {
        setAssets(assetData.dirs);
      });
    }
  }

  function handleClick() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  return (
    <Box>
      <SelectDropdown
        label={label}
        options={assetOptions}
        value={value}
        onChange={onChange}
      />
      <Box marginLeft="medium">
        <Button icon={faFileImport} onClick={handleClick} />
      </Box>
      <input
        type="file"
        id={"input-file-" + label}
        ref={fileRef}
        accept={acceptedFormat}
        onChange={(e) => uploadAsset(e.target?.files)}
        style={{ display: "none" }}
      />
    </Box>
  );
}
