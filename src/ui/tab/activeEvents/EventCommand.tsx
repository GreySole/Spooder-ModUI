import { Box, Stack, TypeFace } from "@greysole/spooder-component-library";
import React, { useEffect } from "react";
import TimerBar from "./TimerBar";

interface EventCommandProps {
  activeCommand: any;
}

export default function EventCommand(props: EventCommandProps) {
  const { activeCommand } = props;
  switch (activeCommand.command.type) {
    case "software":
      return (
        <Stack spacing="small" padding="small">
          <TypeFace>{activeCommand.command.address}</TypeFace>
          <TypeFace>{activeCommand.command.dest_udp}</TypeFace>
          <TimerBar
            timeStart={activeCommand.start_time}
            timeEnd={activeCommand.timeout}
          />
        </Stack>
      );

    case "plugin":
      return (
        <Stack spacing="small" padding="small">
          <TypeFace>{activeCommand.command.pluginname}</TypeFace>
          <TypeFace>{activeCommand.command.eventname}</TypeFace>
          <TimerBar
            timeStart={activeCommand.start_time}
            timeEnd={activeCommand.timeout}
          />
        </Stack>
      );
    default:
      return null;
  }
}
