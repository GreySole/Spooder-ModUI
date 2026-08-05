import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";
import PluginUtilityButton from "./plugins/PluginUtilityButton";
import { Box, Button, SearchBar } from "@spooder/webui-component-library";
import { useFooter } from "../footer/DynamicFooter";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function UtilitiesTab() {
  const plugins = useSelector((state: IRootState) => state.modmapSlice.plugins);

  const { setMainSubTabContent } = useFooter();

  const [searchText, setSearchText] = useState("");

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

  const pluginsWithUtilities = [];
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
    if (plugins[p].utility) {
      pluginsWithUtilities.push(
        <PluginUtilityButton
          pluginName={p}
          pluginDisplayName={plugins[p].name}
        />
      );
    }
  }

  return (
    <Box flexFlow="row wrap" padding="medium">
      {pluginsWithUtilities}
    </Box>
  );
}
