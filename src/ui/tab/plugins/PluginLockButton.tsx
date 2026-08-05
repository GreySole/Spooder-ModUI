import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@spooder/webui-component-library";
import React from "react";
import useModeration from "../../../app/hooks/useModeration";

interface PluginsLockButtonProps {
  pluginName: string;
  subLockName?: string;
  displayName: string;
  isLocked: boolean;
}

export default function PluginsLockButton(props: PluginsLockButtonProps) {
  const { pluginName, subLockName, displayName, isLocked } = props;
  const { getSetPluginLock } = useModeration();
  const { setPluginLock } = getSetPluginLock();
  return (
    <Box margin="small">
      <Button
        width="8rem"
        height="8rem"
        label={displayName}
        icon={isLocked ? faLock : faLockOpen}
        iconPosition="top"
        onClick={() => setPluginLock(pluginName, subLockName, !isLocked)}
      />
    </Box>
  );
}
