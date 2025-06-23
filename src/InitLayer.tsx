import {
  SpooderPet,
  ThemeProvider,
  ThemeVariables,
} from "@greysole/spooder-component-library";
import { useEffect, useState } from "react";
import { getSpooder, getTheme } from "./Request";
import App from "./App";

export default function InitLayer() {
  const [theme, setTheme] = useState<ThemeVariables | undefined>();
  const [spooder, setSpooder] = useState<SpooderPet | undefined>();

  useEffect(() => {
    getTheme().then((data) => {
      console.log("GOT Theme", data);
      setTheme(data as ThemeVariables);
    });

    getSpooder()
      .then((data) => {
        console.log("GOT Spooder", data);
        setSpooder(data as SpooderPet);
      })
      .catch((e) => {
        console.error("ERROR", e);
      });
  }, []);

  if (!theme || !spooder) {
    return null;
  }
  return (
    <ThemeProvider theme={theme} spooder={spooder}>
      <App />
    </ThemeProvider>
  );
}
