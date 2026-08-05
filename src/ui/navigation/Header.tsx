import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import NavigationTabs from "./NavigationTabs";
import {
  Box,
  Icon,
  useTheme,
  CustomSpooder,
} from "@spooder/webui-component-library";
import useNavigation from "../../app/hooks/useNavigation";

export default function Header() {
  const { navigationOpen, toggleNavigation } = useNavigation();
  const { isMobileDevice } = useTheme();
  return (
    <Box
      className="top-header"
      width="100%"
      flexFlow="column"
      justifyContent="center"
    >
      <Box
        className="navigation-bar"
        flexFlow="row nowrap"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft="small"
        paddingRight="small"
        onClick={toggleNavigation}
      >
        <Icon icon={navigationOpen ? faTimes : faBars} iconSize="xlarge" />
        <CustomSpooder />
      </Box>
      {!isMobileDevice ? <NavigationTabs /> : null}
    </Box>
  );
}
