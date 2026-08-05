import {
  faExclamationTriangle,
  faLock,
  faShield,
  faStop,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  SearchBar,
  Button,
  TypeFace,
  Columns,
} from "@spooder/webui-component-library";
import React from "react";

interface PanicSubTabProps {
  setSubTab: (subTab: string) => void;
}

export default function PanicSubTab({ setSubTab }: PanicSubTabProps) {
  return (
    <Box
      width="100%"
      marginLeft="medium"
      marginRight="medium"
      justifyContent="space-between"
      alignItems="center"
    >
      <TypeFace fontSize="large">Panic</TypeFace>
      <Columns spacing="medium">
        <Button icon={faStop} onClick={() => setSubTab("")} />
        <Button icon={faLock} onClick={() => setSubTab("")} />
        <Button icon={faShield} onClick={() => setSubTab("")} />
        <Button icon={faX} onClick={() => setSubTab("")} />
      </Columns>
    </Box>
  );
}
