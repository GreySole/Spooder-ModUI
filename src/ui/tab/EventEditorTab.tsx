import { Box, TypeFace, useToast } from "@spooder/webui-component-library";
import React from "react";
import {
  useGetEventGraphsQuery,
  useSaveEventGraphsMutation,
} from "../../app/api/nodeGraphSlice";
import PageCircleLoader from "../general/PageCircleLoader";
import EventEditorForm from "./eventEditor/EventEditorForm";

// The node graph editor for the event groups the owner has opened to moderators. The server only
// sends, and only accepts, events in those groups.
export default function EventEditorTab() {
  const { data, isLoading, error } = useGetEventGraphsQuery(null);
  const [saveEventGraphs, { isLoading: saving }] = useSaveEventGraphsMutation();
  const { showError, showSuccess } = useToast();

  if (isLoading) {
    return <PageCircleLoader />;
  }

  if (error || !data?.graphs) {
    return (
      <Box flexFlow="column" padding="medium">
        <TypeFace fontSize="large">Couldn't load the event editor.</TypeFace>
      </Box>
    );
  }

  if ((data.groups ?? []).length === 0) {
    return (
      <Box flexFlow="column" padding="medium">
      <TypeFace fontSize="medium">
        No event groups have been opened to moderators yet. The owner can allow a group from the
        Events tab of the main WebUI.
      </TypeFace>
      </Box>
    );
  }

  const save = async (graphs: any) => {
    const result: any = await saveEventGraphs({ graphs });
    if (result?.error) {
      showError(result.error?.data?.message ?? "An error occurred while saving the events.");
      return false;
    }
    showSuccess("Events saved successfully!");
    return true;
  };

  return (
    <EventEditorForm
      graphs={data.graphs}
      groups={data.groups}
      saving={saving}
      onSave={save}
    />
  );
}
