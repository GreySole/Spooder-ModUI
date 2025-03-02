import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@greysole/spooder-component-library";
import React from "react";
import useModeration from "../../../app/hooks/useModeration";

interface EventLockButtonProps {
  eventName: string;
  displayName: string;
  isLocked: boolean;
}

export default function EventLockButton(props: EventLockButtonProps) {
  const { eventName, displayName, isLocked } = props;
  const { getSetEventLock } = useModeration();
  const { setEventLock } = getSetEventLock();
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
