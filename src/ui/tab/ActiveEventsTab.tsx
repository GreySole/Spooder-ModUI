import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";
import { Border, Box, TypeFace } from "@spooder/webui-component-library";
import EventCommand from "./activeEvents/EventCommand";

export default function ActiveEventsTab() {
  const activeEvents = useSelector(
    (state: IRootState) => state.modmapSlice.activeEvents
  );

  if (Object.keys(activeEvents).length === 0) {
    return <div>No active events</div>;
  }

  console.log("Active Events:", activeEvents);

  return (
    <Box>
      {Object.keys(activeEvents).map((id) => {
        const event = activeEvents[id];
        return (
          <Box key={id} flexFlow="column" padding="small">
            <TypeFace>{id}</TypeFace>
            <Border>
              <Box>
                {event.map((command: any, index: number) => {
                  console.log("EveNT", event);
                  return <EventCommand key={index} activeCommand={command} />;
                })}
              </Box>
            </Border>
          </Box>
        );
      })}
    </Box>
  );
}
