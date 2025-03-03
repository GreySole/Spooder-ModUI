import {
  KeyedObject,
  StyleSize,
} from "@greysole/spooder-component-library/dist/types/Types";
import React, { useEffect, useState } from "react";
import EventLockButton from "./commands/EventLockButton";
import {
  Box,
  Button,
  Columns,
  Expandable,
  Modal,
  SaveButton,
  SearchBar,
  TypeFace,
} from "@greysole/spooder-component-library";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";
import { useFooter } from "../footer/DynamicFooter";
import {
  faCheckCircle,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import CreateCommandModal from "./commands/modCommands/create/CreateCommandModal";
import useEvents from "../../app/hooks/useEvents";
import EditCommandModal from "./commands/modCommands/edit/EditCommandModal";

export default function CommandsTab() {
  const modEvents = useSelector(
    (state: IRootState) => state.modmapSlice.commands
  );
  const modEventLocks = useSelector(
    (state: IRootState) => state.modmapSlice.eventLocks
  );

  const { getModCommands } = useEvents();
  const { data, isLoading, error } = getModCommands();
  const { setMainSubTabContent } = useFooter();
  const [searchText, setSearchText] = useState("");

  const [createCommandModalOpen, setCreateCommandModalOpen] = useState(false);
  const [editCommandId, setEditCommandId] = useState("");

  useEffect(() => {
    setMainSubTabContent(
      <Columns spacing="medium">
        <Box width="60%">
          <SearchBar
            placeholder="Search commands"
            width="100%"
            value={searchText}
            onSearch={(text) => setSearchText(text)}
          />
        </Box>
        <Button icon={faPlus} onClick={() => setCreateCommandModalOpen(true)} />
      </Columns>
    );

    return () => {
      setMainSubTabContent(null);
    };
  }, [searchText]);

  console.log("EVENTS", modEvents, modEventLocks);

  const modCommandGroup = [];
  for (let mc in data) {
    modCommandGroup.push(
      <Button
        width="8rem"
        height="8rem"
        label={data[mc].command}
        icon={data[mc].enabled ? faCheckCircle : faXmarkCircle}
        iconPosition="top"
        onClick={() => setEditCommandId(mc)}
      />
    );
  }

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
      <CreateCommandModal
        createCommandModalOpen={createCommandModalOpen}
        setCreateCommandModalOpen={setCreateCommandModalOpen}
      />
      <EditCommandModal
        editCommandId={editCommandId}
        setEditCommandId={setEditCommandId}
      />
      {modCommandGroup.length > 0 ? (
        <Expandable label="_ModCommands" forceOpen={true}>
          <Box width="100%" flexFlow="row wrap" padding="medium">
            {modCommandGroup}
          </Box>
        </Expandable>
      ) : null}

      {eventGroupElements}
    </Box>
  );
}
