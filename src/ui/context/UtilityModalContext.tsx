import { Modal } from "@greysole/spooder-component-library";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";

interface UtilityModalProviderProps {
  children: ReactNode;
}

export const UtilityModalContext = createContext({
  setIsOpen: (isOpen: boolean) => {},
  setPluginName: (pluginName: string) => {},
});

export function useUtilityModal() {
  const context = useContext(UtilityModalContext);
  if (!context) {
    throw new Error(
      "useUtilityModal must be used within a UtilityModalProvider"
    );
  }
  return context;
}

export default function UtilityModalProvider(props: UtilityModalProviderProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [pluginName, setPluginName] = useState("");
  const activePlugin = useSelector(
    (state: IRootState) => state.modmapSlice.plugins[pluginName]
  );

  const value = {
    setIsOpen,
    setPluginName,
  };

  return (
    <UtilityModalContext.Provider value={value}>
      <Modal
        title={activePlugin?.name ?? "ModUtility"}
        content={
          pluginName !== "" ? (
            <iframe
              src={`http://localhost:3000/utility/${pluginName}`}
              width="100%"
              height="100%"
            />
          ) : null
        }
        isOpen={isOpen}
        onClose={() => {
          setPluginName("");
          setIsOpen(false);
        }}
      />
      {children}
    </UtilityModalContext.Provider>
  );
}
