import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormLoader,
  FormSelectDropdown,
  KeyedObject,
  TypeFace,
} from "@greysole/spooder-component-library";
import { getPluginAssets, uploadPluginAsset } from "../../Request";

interface FormAssetSelectProps {
  formKey: string;
  label?: string;
  assetType?: string;
  pluginName: string;
  assetFolderPath: string;
}

export default function FormAssetSelect(props: FormAssetSelectProps) {
  const { formKey, label, assetType, pluginName, assetFolderPath } = props;
  const acceptedFormat = assetType != null ? assetType + "/*" : "*";
  const [assets, setAssets] = useState<KeyedObject>();

  useEffect(() => {
    getPluginAssets(pluginName, assetFolderPath).then((assetData) => {
      setAssets(assetData.dirs);
    });
  }, []);

  console.log("ASSET FOLDER PATH", assetFolderPath);
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
    <Box flexFlow="column">
      <TypeFace fontWeight="bold">{label}</TypeFace>

      <Box>
        <FormSelectDropdown formKey={formKey} options={assetOptions} />
        <Box marginLeft="medium">
          <Button icon={faFileImport} onClick={handleClick} />
        </Box>
      </Box>
      <input
        type="file"
        id={"input-file-" + formKey}
        ref={fileRef}
        accept={acceptedFormat}
        onChange={(e) => uploadAsset(e.target?.files)}
        style={{ display: "none" }}
      />
    </Box>
  );
}
