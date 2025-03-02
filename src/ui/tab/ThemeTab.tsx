import React from "react";
import { Box, Button } from "@greysole/spooder-component-library";
import ThemeColor from "./theme/ThemeColor";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

export default function ThemeTab() {
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
