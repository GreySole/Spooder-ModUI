import React, { ReactNode } from "react";
import useThemeApi from "./app/hooks/useThemeApi";
import InitLayer from "./InitLayer";
import { ThemeProvider } from "@spooder/webui-component-library";

export default function ThemeLayer() {
  const { getModTheme, getCustomSpooder } = useThemeApi();
  const {
    data: theme,
    isLoading: themeLoading,
    error: themeError,
  } = getModTheme();

  const {
    data: customSpooder,
    isLoading: customSpooderLoading,
    error: customSpooderError,
  } = getCustomSpooder();

  if (
    themeLoading ||
    customSpooderLoading ||
    themeError ||
    customSpooderError
  ) {
    return null;
  }

  return (
    <ThemeProvider theme={{ ...theme }} spooder={customSpooder}>
      <InitLayer />
    </ThemeProvider>
  );
}
