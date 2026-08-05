import React from "react";
import { useEffect, useState } from "react";
import { Stack, TypeFace } from "@spooder/webui-component-library";
import ProgressBar from "./ProgressBar";

interface TimerBarProps {
  timeStart: number;
  timeEnd: number;
}

export default function TimerBar(props: TimerBarProps) {
  const { timeStart, timeEnd } = props;
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      if (Date.now() >= timeEnd) {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (expired) {
    return null;
  }

  return (
    <Stack spacing="small">
      <TypeFace>
        {new Date(timeEnd - currentTime).toTimeString().slice(3, 8)}
      </TypeFace>
      <ProgressBar
        total={timeEnd - timeStart}
        current={currentTime - timeStart}
        width="100%"
      />
    </Stack>
  );
}
