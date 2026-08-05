import React from "react";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, ImageFile } from "@spooder/webui-component-library";
import useModeration from "../../../app/hooks/useModeration";

interface PluginLockButtonProps {
  pluginName: string;
  pluginDisplayName: string;
  isLocked: boolean;
  onPluginOpen: (pluginName: string) => void;
}

export default function PluginOpenButton({
  pluginName,
  pluginDisplayName,
  isLocked,
  onPluginOpen,
}: PluginLockButtonProps) {
  const { getSetPluginLock } = useModeration();
  const { setPluginLock } = getSetPluginLock();
  const iconURL = `/icons/${pluginName}.png`;

  return (
    <Box margin="small">
      <Button
        width="10rem"
        height="10rem"
        label={pluginDisplayName}
        icon={iconURL}
        fallbackIcon={faPlug}
        iconSize="75px"
        iconPosition="top"
        color={isLocked ? "red" : undefined}
        onClick={() => onPluginOpen(pluginName)}
        onLongPress={() => setPluginLock(pluginName, undefined, !isLocked)}
      />
    </Box>
  );
}
