import React from "react";
import App from "./App";
import { OscProvider, ThemeProvider, CircleLoader } from "@greysole/spooder-component-library";
import useModeration from "./app/hooks/useModeration";
import useThemeApi from "./app/hooks/useTheme";

export default function InitLayer() {
  const {getUtilities} = useModeration();
  const {getModTheme, getCustomSpooder} = useThemeApi();
  //const {data:theme, isLoading:themeLoading, error:themeError} = getModTheme("user");
  const {data:customSpooder, isLoading:customSpooderLoading, error:customSpooderError} = getCustomSpooder();
  const { data, isLoading, error } = getUtilities();

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
    hue:0,
    saturation:0,
    isDarkTheme:true
  }

  return (
    <OscProvider host={data.oscURL} port={data.oscPort}>
      <ThemeProvider theme={theme} spooder={customSpooder}>
        <App moduser={data.moduser} modmap={data.modmap}/>
      </ThemeProvider>
    </OscProvider>
  );
}
