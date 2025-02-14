import { Box, Modal, useTheme } from "@greysole/spooder-component-library";
import React, { useState } from "react";
import NavigationMenu from "./ui/navigation/NavigationMenu";
import useNavigation from "./app/hooks/useNavigation";
import PluginsTab from "./ui/tab/PluginsTab";
import Header from "./ui/Header";
import EventsTab from "./ui/tab/EventsTab";
import { Footer } from "./ui/Footer";
import TabContent from "./ui/TabContent";

interface AppProps {
  moduser: string;
  modmap: any;
}
export default function App({ modmap }: AppProps) {
  const { isMobileDevice } = useTheme();

  const height = `calc(100dvh - var(--header-height)${
    isMobileDevice ? "" : " - var(--navigation-tabs-height)"
  })`;

  return (
    <Box>
      <Header />
      <NavigationMenu />
      <Modal
        title="ModUI"
        content={<div></div>}
        isOpen={false}
        onClose={() => {}}
      />
      <Box
        width="100%"
        height={height}
        marginTop={
          isMobileDevice
            ? "calc(var(--header-height)"
            : "calc(var(--header-height) + var(--navigation-tabs-height))"
        }
        flexFlow="column"
        overflow="auto"
      >
        <TabContent />
      </Box>
    </Box>
  );
}
