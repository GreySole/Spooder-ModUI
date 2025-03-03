import { Box, Button, SearchBar } from "@greysole/spooder-component-library";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Footer } from "./Footer";
import {
  faBullhorn,
  faExclamationTriangle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import PanicSubTab from "./subtab/PanicSubTab";

interface DynamicFooterProps {
  children: ReactNode;
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a DynamicFooterProvider");
  }
  return context;
}

export const FooterContext = createContext({
  setMainSubTabContent: (content: ReactNode) => {},
});

export default function DynamicFooterProvider(props: DynamicFooterProps) {
  const { children } = props;
  const [subTab, setSubTab] = useState("");
  const [mainSubTabContent, setMainSubTabContent] = useState<ReactNode>();

  const subTabContent =
    subTab === "panic" ? (
      <PanicSubTab setSubTab={setSubTab} />
    ) : (
      <Box
        width="100%"
        marginLeft="medium"
        marginRight="medium"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>{mainSubTabContent}</Box>
        <Button
          icon={faExclamationTriangle}
          onClick={() => setSubTab("panic")}
        />
      </Box>
    );

  return (
    <FooterContext.Provider value={{ setMainSubTabContent }}>
      {children}
      <Footer showFooter={true}>{subTabContent}</Footer>
    </FooterContext.Provider>
  );
}
