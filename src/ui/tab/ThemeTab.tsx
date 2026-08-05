import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@spooder/webui-component-library";
import ThemeColor from "./theme/ThemeColor";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useFooter } from "../footer/DynamicFooter";
import useModeration from "../../app/hooks/useModeration";

export default function ThemeTab() {
  const { setMainSubTabContent } = useFooter();
  const { getSaveTheme } = useModeration();
  const { themeVariables } = useTheme();
  const { saveTheme } = getSaveTheme();

  console.log("Theme Variables", themeVariables);

  useEffect(() => {
    setMainSubTabContent(
      <Box width="100%" justifyContent="space-between">
        <Button
          label="Save"
          onClick={() =>
            saveTheme(
              themeVariables.hue,
              themeVariables.saturation,
              themeVariables.isDarkTheme
            )
          }
        />
      </Box>
    );
    return () => {
      setMainSubTabContent(null);
    };
  }, [themeVariables]);
  return (
    <Box width="100%" padding="medium" justifyContent="space-evenly">
      <Box width="50%">
        <ThemeColor />
      </Box>
      <Box>
        <Button
          label="Sample Text"
          width="128px"
          height="128px"
          icon={faLockOpen}
          iconPosition="top"
          onClick={() => {}}
        />
      </Box>
    </Box>
  );
}
