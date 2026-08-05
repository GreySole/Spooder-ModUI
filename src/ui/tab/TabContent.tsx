import { Box } from "@spooder/webui-component-library";
import React from "react";
import { Footer } from "../footer/Footer";
import CommandsTab from "./CommandsTab";
import PluginsTab from "./PluginsTab";
import useNavigation from "../../app/hooks/useNavigation";
import UtilitiesTab from "./UtilitiesTab";
import ThemeTab from "./ThemeTab";
import ActiveEventsTab from "./ActiveEventsTab";

export default function TabContent() {
  const { currentTab } = useNavigation();
  if (currentTab == "dashboard") {
  } else if (currentTab == "events") {
    return <ActiveEventsTab />;
  } else if (currentTab == "commands") {
    return <CommandsTab />;
  } else if (currentTab == "plugins") {
    return <PluginsTab />;
  } else if (currentTab == "utilities") {
    return <UtilitiesTab />;
  } else if (currentTab == "theme") {
    return <ThemeTab />;
  }
}
