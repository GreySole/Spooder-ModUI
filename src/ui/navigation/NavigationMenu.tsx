import React from "react";
import { Box, Stack } from "@greysole/spooder-component-library";
import TabButton from "./TabButton";
import useNavigation from "../../app/hooks/useNavigation";

export default function NavigationMenu() {
  const { tabOptions, navigationOpen } = useNavigation();

  const tabButtons = Object.keys(tabOptions).map((tab: string, index) => {
    const tabLabel = tabOptions[tab];
    return (
      <Box padding="small">
        <TabButton key={tab} tabLable={tabLabel} tabName={tab} />
      </Box>
    );
  });

  return (
    <Box
      flexFlow="column"
      className={`navigation-menu${navigationOpen ? " open" : ""}`}
      overflow="auto"
      padding="medium"
      height="calc(100vh - var(--header-height))"
    >
      <Stack spacing="medium" padding="small">
        <Box flexFlow="row wrap" padding="small">
          {tabButtons}
        </Box>
      </Stack>
    </Box>
  );
}
