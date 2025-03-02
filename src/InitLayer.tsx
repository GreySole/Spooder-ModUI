import React, { useEffect } from "react";
import App from "./App";
import {
  OscProvider,
  ThemeProvider,
  CircleLoader,
} from "@greysole/spooder-component-library";
import useModeration from "./app/hooks/useModeration";
import useThemeApi from "./app/hooks/useTheme";
import { useDispatch } from "react-redux";
import { _setInitialData } from "./app/slice/modmapSlice";

export default function InitLayer() {
  const { getModmap } = useModeration();
  const { getModTheme, getCustomSpooder } = useThemeApi();
  //const {data:theme, isLoading:themeLoading, error:themeError} = getModTheme("user");
  const {
    data: customSpooder,
    isLoading: customSpooderLoading,
    error: customSpooderError,
  } = getCustomSpooder();
  const { data, isLoading, error } = getModmap();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    console.log("SET DATA LOADING", data.modmap);
    dispatch(_setInitialData(data.modmap));
  }, [isLoading]);

  if (error || customSpooderError) {
    return (
      <div className="App">
        <div className="locals-only">
          <h1 className="App-title">/╲/\( ºx ω xº )/\╱\</h1>
          <h1>Can't connect to Spooder. Is it on?</h1>
        </div>
      </div>
    );
  }

  if (isLoading || customSpooderLoading) {
    return <CircleLoader />;
  }

  const theme = {
    hue: 0,
    saturation: 0,
    isDarkTheme: true,
  };

  return (
    <OscProvider host={data.oscURL} port={data.oscPort}>
      <ThemeProvider theme={theme} spooder={customSpooder}>
        <App moduser={data.moduser} modmap={data.modmap} />
      </ThemeProvider>
    </OscProvider>
  );
}
