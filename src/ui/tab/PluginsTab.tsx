import React from "react";
import useModeration from "../../app/hooks/useModeration";
import PluginLockButton from "../../PluginLockButton";
import { Box } from "@greysole/spooder-component-library";

export default function PluginsTab() {
  const { getUtilities } = useModeration();
  const { data, isLoading, error } = getUtilities();
  const modmap = data.modmap;
  const plugins = modmap.plugins;
  const pluginLocks = modmap.modlocks.plugins;
  const pluginElements = [];

  if (isLoading) {
    return null;
  }

  for (let p in plugins) {
    pluginElements.push(
      <PluginLockButton
        key={p}
        pluginName={p}
        pluginDisplayName={plugins[p].name}
        isLocked={pluginLocks[p] == 1}
      />
    );
  }
  return (
    <Box flexFlow="row wrap" padding="medium">
      {pluginElements}
    </Box>
  );
}
