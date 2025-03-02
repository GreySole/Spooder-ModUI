import {
  KeyedObject,
  StyleSize,
} from "@greysole/spooder-component-library/dist/types/Types";
import React, { useEffect, useState } from "react";
import EventLockButton from "./commands/EventLockButton";
import {
  Box,
  Button,
  Expandable,
  Modal,
  SearchBar,
  TypeFace,
} from "@greysole/spooder-component-library";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";
import { useFooter } from "../footer/DynamicFooter";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateCommandModalContent from "./commands/CreateCommandModalContent";

export default function CommandsTab() {
  const modEvents = useSelector(
    (state: IRootState) => state.modmapSlice.commands
  );
  const modEventLocks = useSelector(
    (state: IRootState) => state.modmapSlice.eventLocks
  );

  const { setMainSubTabContent } = useFooter();
  const [createCommandModalOpen, setCreateCommandModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setMainSubTabContent(
      <Box flexFlow="row wrap">
        <SearchBar
          placeholder="Search commands"
          value={searchText}
          onSearch={(text) => setSearchText(text)}
        />
        <Button icon={faPlus} onClick={() => setCreateCommandModalOpen(true)} />
      </Box>
    );

    return () => {
      setMainSubTabContent(null);
    };
  }, [searchText]);

  console.log("EVENTS", modEvents, modEventLocks);

  const eventGroups = {} as KeyedObject;
  for (let e in modEvents) {
    if (modEventLocks[e] == true) {
      console.log(modEvents[e].name, "LOCKED");
    }
    if (
      searchText !== "" &&
      !(
        e.toLowerCase().includes(searchText.toLowerCase()) ||
        modEvents[e].name.toLowerCase().includes(searchText.toLowerCase())
      )
    ) {
      continue;
    }
    if (eventGroups[modEvents[e].group] == null) {
      eventGroups[modEvents[e].group] = [];
    }
    eventGroups[modEvents[e].group].push(
      <EventLockButton
        key={e + "-" + modEventLocks[e]}
        eventName={e}
        displayName={modEvents[e].name}
        isLocked={modEventLocks[e] == 1}
      />
    );
  }
  let eventGroupElements = [];
  for (let g in eventGroups) {
    eventGroupElements.push(
      <Box flexFlow="column" width="100%" marginBottom="small">
        <Expandable label={g} forceOpen={searchText !== ""}>
          <Box width="100%" flexFlow="row wrap" padding="medium">
            {eventGroups[g]}
          </Box>
        </Expandable>
      </Box>
    );
  }
  return (
    <Box flexFlow="column" padding="medium">
      <Modal
        title="Create Command"
        content={<CreateCommandModalContent />}
        isOpen={createCommandModalOpen}
        onClose={() => setCreateCommandModalOpen(false)}
      ></Modal>
      {eventGroupElements}
    </Box>
  );
}
