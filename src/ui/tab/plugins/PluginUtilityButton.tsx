import React from "react";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, ImageFile } from "@greysole/spooder-component-library";
import useModeration from "../../../app/hooks/useModeration";
import { useUtilityModal } from "../../context/UtilityModalContext";

interface PluginUtilityButtonProps {
  pluginName: string;
  pluginDisplayName: string;
}

export default function PluginUtlityButton({
  pluginName,
  pluginDisplayName,
}: PluginUtilityButtonProps) {
  const { setIsOpen, setPluginName } = useUtilityModal();

  const buttonOnClick = () => {
    setPluginName(pluginName);
    setIsOpen(true);
  };

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
        onClick={buttonOnClick}
      />
    </Box>
  );
}
