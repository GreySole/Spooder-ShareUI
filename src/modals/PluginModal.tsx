import { useShareMenu } from "../pluginSettings/context/MainMenuContext";
import PluginModalContextProvider from "./context/PluginModalContext";

export default function PluginModal() {
  const { shareInfo } = useShareMenu();
  return <PluginModalContextProvider plugins={shareInfo.share.plugins} />;
}
