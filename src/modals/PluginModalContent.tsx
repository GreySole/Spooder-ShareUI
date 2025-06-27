import PluginModalContextProvider from "./context/PluginModalContext";

interface PluginModalContentProps {
  plugins: { [key: string]: boolean };
}

export default function PluginModalContent(props: PluginModalContentProps) {
  const { plugins } = props;

  return <PluginModalContextProvider plugins={plugins} />;
}
