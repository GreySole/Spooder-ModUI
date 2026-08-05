import React, { useEffect } from "react";
import App from "./App";
import {
  OscProvider,
  CircleLoader,
  Box,
} from "@spooder/webui-component-library";
import useModeration from "./app/hooks/useModeration";
import { useDispatch } from "react-redux";
import { _setInitialData } from "./app/slice/modmapSlice";
import PageCircleLoader from "./ui/general/PageCircleLoader";

export default function InitLayer() {
  const { getModmap } = useModeration();

  const { data, isLoading, error } = getModmap();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    console.log("SET DATA LOADING", data.modmap);
    dispatch(_setInitialData(data.modmap));
  }, [isLoading, data?.modmap, dispatch]);

  if (error) {
    return (
      <div className="App">
        <div className="locals-only">
          <h1 className="App-title">/╲/\( ºx ω xº )/\╱\</h1>
          <h1>Can't connect to Spooder. Is it on?</h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Box width="100vw" height="100dvh">
        <PageCircleLoader />
      </Box>
    );
  }

  return (
    <OscProvider host={data.oscURL} port={data.oscPort}>
      <App moduser={data.moduser} modmap={data.modmap} />
    </OscProvider>
  );
}
