import { Box } from "@greysole/spooder-component-library";
import React from "react";
import { Footer } from "./Footer";
import EventsTab from "./tab/EventsTab";
import PluginsTab from "./tab/PluginsTab";
import useNavigation from "../app/hooks/useNavigation";

export default function TabContent() {
  const { currentTab } = useNavigation();
  let mainContent = null;
  if (currentTab == "dashboard") {
  } else if (currentTab == "commands") {
    mainContent = <EventsTab />;
  } else if (currentTab == "plugins") {
    mainContent = <PluginsTab />;
  }

  return mainContent;
}
