import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@greysole/spooder-component-library";
import React from "react";
import useModeration from "./app/hooks/useModeration";

interface EventCardProps {
  eventName: string;
  displayName: string;
  isLocked: boolean;
}

export default function EventCard(props: EventCardProps) {
  const { eventName, displayName, isLocked } = props;
  const { setEventLock } = useModeration();
  return (
    <Box margin="small">
      <Button
        width="8rem"
        height="8rem"
        label={displayName}
        icon={isLocked ? faLock : faLockOpen}
        iconPosition="top"
        onClick={() => setEventLock(eventName, !isLocked)}
      />
    </Box>
  );
}
