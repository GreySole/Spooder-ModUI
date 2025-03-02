import { Box } from "@greysole/spooder-component-library";
import React from "react";
import { Footer } from "../footer/Footer";
import CommandsTab from "./CommandsTab";
import PluginsTab from "./PluginsTab";
import useNavigation from "../../app/hooks/useNavigation";
import UtilitiesTab from "./UtilitiesTab";
import ThemeTab from "./ThemeTab";

export default function TabContent() {
  const { currentTab } = useNavigation();
  let mainContent = null;
  if (currentTab == "dashboard") {
  } else if (currentTab == "commands") {
    mainContent = <CommandsTab />;
  } else if (currentTab == "plugins") {
    mainContent = <PluginsTab />;
  } else if (currentTab == "utilities") {
    mainContent = <UtilitiesTab />;
  } else if (currentTab == "theme") {
    mainContent = <ThemeTab />;
  }

  return mainContent;
}
