// filepath: /c:/Users/zasur/Documents/GitHub/Spooder-WebUI/src/context/FooterContext.tsx
import { Box } from "@spooder/webui-component-library";
import React, { ReactNode, useRef } from "react";

interface FooterProps {
  showFooter: boolean;
  children: ReactNode;
}

export function Footer({ children, showFooter }: FooterProps) {
  const ref = useRef(null);
  return (
    <Box
      ref={ref}
      className="footer"
      width="100%"
      height="var(--footer-height)"
    >
      {children}
    </Box>
  );
}
