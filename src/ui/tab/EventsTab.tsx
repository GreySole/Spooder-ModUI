import {
  KeyedObject,
  StyleSize,
} from "@greysole/spooder-component-library/dist/types/Types";
import React from "react";
import useModeration from "../../app/hooks/useModeration";
import EventCard from "../../EventCard";
import { Box, Expandable, TypeFace } from "@greysole/spooder-component-library";

export default function EventsTab() {
  const { getUtilities } = useModeration();
  const { data, isLoading, error } = getUtilities();
  const modmap = data.modmap;
  const modEvents = modmap.events;
  const modEventLocks = modmap.modlocks.events;
  const eventGroups = {} as KeyedObject;
  for (let e in modEvents) {
    if (modEventLocks[e] == true) {
      console.log(modEvents[e].name, "LOCKED");
    }
    if (eventGroups[modEvents[e].group] == null) {
      eventGroups[modEvents[e].group] = [];
    }
    eventGroups[modEvents[e].group].push(
      <EventCard
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
        <Expandable label={g}>
          <Box width="100%" flexFlow="row wrap" padding="medium">
            {eventGroups[g]}
          </Box>
        </Expandable>
      </Box>
    );
  }
  return (
    <Box flexFlow="column" padding="medium">
      {eventGroupElements}
    </Box>
  );
}
