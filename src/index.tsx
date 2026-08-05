import React from "react";
import ReactDOM from "react-dom/client";
import InitLayer from "./InitLayer";

const root = ReactDOM.createRoot(
  document.getElementById("app") as HTMLElement
);
root.render(
  <React.StrictMode>
    <InitLayer />
  </React.StrictMode>
);
