import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store";

export default function ActiveEventsTab() {
  const activeEvents = useSelector(
    (state: IRootState) => state.modmapSlice.activeEvents
  );

  if (Object.keys(activeEvents).length === 0) {
    return <div>No active events</div>;
  }
}
