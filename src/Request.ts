import { KeyedObject } from "@greysole/spooder-component-library";
import { ShareUser, ShareUserResponse } from "./Types";

export function getTheme() {
  return new Promise<KeyedObject>((res, rej) => {
    fetch("/theme/main_theme", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Theme", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function getSpooder() {
  return new Promise<KeyedObject>((res, rej) => {
    fetch("/theme/custom_spooder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Spooder", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function getShareUser() {
  return new Promise<ShareUserResponse>((res, rej) => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareUser = urlParams.get("key");

    fetch(`/shares/get_user?key=${shareUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: ShareUserResponse) => {
        console.log("GOT Share User", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function getSharedPlugins() {
  return new Promise<KeyedObject>((res, rej) => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareKey = urlParams.get("key");

    fetch(`/shares/get_shared_plugins?key=${shareKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Shared Plugins", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function getPluginSettings(pluginName: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const shareKey = urlParams.get("key");
  return new Promise<KeyedObject>((res, rej) => {
    fetch(`/shares/get_share_plugin_settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        key: shareKey,
        pluginName: pluginName,
      }),
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Plugin Settings", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function getPluginAssets(
  pluginName: string,
  folderPath: string
): Promise<KeyedObject> {
  const urlParams = new URLSearchParams(window.location.search);
  const shareKey = urlParams.get("key");
  return new Promise((res, rej) => {
    fetch(`/shares/browse_share_plugin_assets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        key: shareKey,
        pluginName: pluginName,
        folder: folderPath ? folderPath : "/",
      }),
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Plugin Assets", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function uploadPluginAsset(
  pluginName: string,
  folderPath: string,
  files: FileList | null
): Promise<KeyedObject> {
  const urlParams = new URLSearchParams(window.location.search);
  const shareKey = urlParams.get("key");
  const fd = new FormData();
  fd.append("key", shareKey || "");
  fd.append("pluginName", pluginName);
  fd.append("assetPath", folderPath || "/");
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
  }
  return new Promise((res, rej) => {
    fetch(`/shares/upload_share_plugin_asset`, {
      method: "POST",
      headers: {},
      body: fd,
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Plugin Assets", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function savePluginSettings(
  pluginName: string,
  settings: KeyedObject
): Promise<KeyedObject> {
  const urlParams = new URLSearchParams(window.location.search);
  const shareKey = urlParams.get("key");
  return new Promise((res, rej) => {
    fetch(`/shares/save_share_plugin_settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        key: shareKey,
        pluginName: pluginName,
        new_settings: settings,
      }),
    })
      .then((response) => response.json())
      .then((data: KeyedObject) => {
        console.log("GOT Plugin Settings", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}
