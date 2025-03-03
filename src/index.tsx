import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import InitLayer from "./InitLayer";
import { createRoot } from "react-dom/client";
import "./ui/css/index.scss";
import ThemeLayer from "./ThemeLayer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <Provider store={store}>
    <ThemeLayer />
  </Provider>
);
