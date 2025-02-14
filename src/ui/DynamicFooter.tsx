import { Box, Button, SearchBar } from "@greysole/spooder-component-library";
import React, { useState } from "react";
import { Footer } from "./Footer";
import {
  faBullhorn,
  faExclamationTriangle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function DynamicFooter() {
  const [subTab, setSubTab] = useState("");
  return (
    <Footer showFooter={true}>
      <Box>
        <SearchBar onSearch={() => {}} />
        <Button icon={faBullhorn} onClick={() => setSubTab("announce")} />
        <Button
          icon={faExclamationTriangle}
          onClick={() => setSubTab("panic")}
        />
      </Box>
    </Footer>
  );
}
