import React, { useEffect, useState } from "react";
import useModeration from "../../app/hooks/useModeration";
import PluginLockButton from "./plugins/PluginOpenButton";
import {
  Box,
  Button,
  Modal,
  SearchBar,
} from "@spooder/webui-component-library";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";
import PluginOpenButton from "./plugins/PluginOpenButton";
import PluginModalContent from "./plugins/PluginModalContent";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useFooter } from "../footer/DynamicFooter";

export default function PluginsTab() {
  const plugins = useSelector((state: IRootState) => state.modmapSlice.plugins);
  const pluginLocks = useSelector(
    (state: IRootState) => state.modmapSlice.pluginLocks
  );

  const [selectedPluginName, setSelectedPluginName] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalClose = () => {
    setSelectedPluginName("");
    setModalOpen(false);
  };
  const [searchText, setSearchText] = useState("");
  const { setMainSubTabContent } = useFooter();

  useEffect(() => {
    setMainSubTabContent(
      <Box flexFlow="row wrap">
        <SearchBar
          placeholder="Search plugins"
          value={searchText}
          onSearch={(text) => setSearchText(text)}
        />
      </Box>
    );

    return () => {
      setMainSubTabContent(null);
    };
  }, [searchText]);
  const pluginElements = [];

  for (let p in plugins) {
    if (
      searchText !== "" &&
      !(
        p.toLowerCase().includes(searchText.toLowerCase()) ||
        plugins[p].name.toLowerCase().includes(searchText.toLowerCase())
      )
    ) {
      continue;
    }
    pluginElements.push(
      <PluginOpenButton
        key={p}
        pluginName={p}
        pluginDisplayName={plugins[p].name}
        isLocked={pluginLocks[p] == 1}
        onPluginOpen={() => {
          setSelectedPluginName(p);
          setModalOpen(true);
        }}
      />
    );
  }
  return (
    <Box flexFlow="row wrap" padding="medium">
      <Modal
        title={selectedPluginName != "" ? plugins[selectedPluginName].name : ""}
        content={<PluginModalContent pluginName={selectedPluginName} />}
        isOpen={modalOpen}
        onClose={modalClose}
      ></Modal>
      {pluginElements}
    </Box>
  );
}
