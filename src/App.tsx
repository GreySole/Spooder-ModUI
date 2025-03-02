import {
  Box,
  Modal,
  useOSC,
  useTheme,
} from "@greysole/spooder-component-library";
import React, { useEffect, useState } from "react";
import NavigationMenu from "./ui/navigation/NavigationMenu";
import Header from "./ui/navigation/Header";
import TabContent from "./ui/tab/TabContent";
import DynamicFooter from "./ui/footer/DynamicFooter";
import { useDispatch } from "react-redux";
import { _setEventLock, _setPluginLock } from "./app/slice/modmapSlice";
import UtilityModalProvider from "./ui/context/UtilityModalContext";

interface AppProps {
  moduser: string;
  modmap: any;
}
export default function App({ modmap }: AppProps) {
  const { isMobileDevice } = useTheme();
  const { addListener, isReady } = useOSC();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) return;

    addListener("/mod/*", (message) => {
      const modCommand = message.address.split("/");
      const action = modCommand[2];
      const actionType = modCommand[3];
      const lockName = modCommand[4];
      const subLockName = modCommand[5];
      const isLocked = message.args[0] === 1;
      console.log("modCommand", modCommand);
      if (action === "lock") {
        if (actionType === "event") {
          dispatch(
            _setEventLock({
              isLocked: isLocked,
              eventName: lockName,
            })
          );
        } else if (actionType === "plugin") {
          dispatch(
            _setPluginLock({
              isLocked: isLocked,
              pluginName: lockName,
              subLockName: subLockName,
            })
          );
        }
      }
    });
    console.log("LISTENER ADDED");
  }, [isReady]);

  const height = `calc(100dvh - var(--header-height)${
    isMobileDevice ? "" : " - var(--navigation-tabs-height)"
  })`;

  return (
    <Box>
      <Header />
      <NavigationMenu />

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
        <UtilityModalProvider>
          <DynamicFooter>
            <TabContent />
          </DynamicFooter>
        </UtilityModalProvider>
      </Box>
    </Box>
  );
}
