import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../app/store";
import { BoolSwitch, Box, TypeFace } from "@greysole/spooder-component-library";
import PluginsLockButton from "./PluginLockButton";
import useModeration from "../../../app/hooks/useModeration";

interface PluginModalContentProps {
  pluginName: string;
}

export default function PluginModalContent({
  pluginName,
}: PluginModalContentProps) {
  const { getSetPluginLock } = useModeration();
  const { setPluginLock } = getSetPluginLock();

  const plugin = useSelector(
    (state: IRootState) => state.modmapSlice.plugins[pluginName]
  );
  const pluginIsLocked = useSelector(
    (state: IRootState) => state.modmapSlice.pluginLocks[pluginName] === 1
  );

  const pluginModmap = plugin.modmap?.locks;
  console.log(pluginModmap);

  const pluginLockElements = [] as ReactNode[];

  for (let p in pluginModmap) {
    pluginLockElements.push(
      <PluginsLockButton
        pluginName={pluginName}
        displayName={p}
        subLockName={p}
        isLocked={pluginModmap[p] === 1}
      />
    );
  }

  return (
    <Box flexFlow="column" padding="small">
      <BoolSwitch
        label="Lock Plugin"
        value={pluginIsLocked}
        onChange={() => setPluginLock(pluginName, undefined, !pluginIsLocked)}
      />
      <Box flexFlow="row wrap" padding="medium">
        {pluginLockElements}
      </Box>
    </Box>
  );
}
