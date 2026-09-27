import { faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Columns,
  Expandable,
  FormNumberInput,
  FormTextInput,
  MultiPageModal,
  Stack,
  TextInput,
  TypeFace,
} from "@spooder/webui-component-library";
import {
  EventNodes,
  NodeGraphHostProvider,
} from "@spooder/webui-node-graph";
import {
  buildGraphKey,
  buildKey,
  GRAPH_KEY,
} from "@spooder/webui-module-sdk";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import modNodeGraphHost from "../../../nodeGraph/modNodeGraphHost";

interface EventEditorFormProps {
  graphs: { [eventId: string]: any };
  groups: string[];
  saving: boolean;
  onSave: (graphs: any) => Promise<boolean>;
}

// The editor's form root has the shape the node graph package reads: `graphs` keyed by event id.
// (The groups aren't part of it - moderators can't add, rename or remove them.)
export default function EventEditorForm(props: EventEditorFormProps) {
  const { graphs, groups, saving, onSave } = props;
  const form = useForm({ defaultValues: { graphs } });
  const [openEvent, setOpenEvent] = useState<string | null>(null);

  // Follows the server after a save (or someone else's edit) refetches.
  useEffect(() => {
    form.reset({ graphs });
  }, [graphs]);

  const saveClick = async () => {
    const ok = await onSave(form.getValues(GRAPH_KEY));
    if (ok) {
      form.reset(form.getValues());
    }
  };

  return (
    <FormProvider {...form}>
      {/* A top-aligned column like the other mod tabs: a default Box centres its children, and
          once they're taller than the tab the top ends up above the scroll area, out of reach. */}
      <Box flexFlow="column" alignItems="flex-start" padding="medium" width="100%">
        <Stack spacing="medium" width="100%">
          <Columns spacing="small">
            <TypeFace fontSize="xlarge">Event Editor</TypeFace>
            {form.formState.isDirty ? (
              <Button
                label={saving ? "Saving…" : "Save"}
                icon={faSave}
                onClick={saveClick}
                disabled={saving}
              />
            ) : null}
          </Columns>
          {groups.map((group) => (
            <GroupSection key={group} group={group} onOpen={setOpenEvent} />
          ))}
        </Stack>
      </Box>
      <EventEditorModal
        eventName={openEvent}
        onClose={() => setOpenEvent(null)}
        onSave={saveClick}
        saving={saving}
      />
    </FormProvider>
  );
}

function GroupSection(props: { group: string; onOpen: (eventId: string) => void }) {
  const { group, onOpen } = props;
  const { watch, setValue, getValues } = useFormContext();
  const [newName, setNewName] = useState("");
  const graphs = watch(GRAPH_KEY) ?? {};

  const events = Object.keys(graphs)
    .filter((id) => graphs[id].group === group)
    .sort((a, b) => graphs[a].name.localeCompare(graphs[b].name));
  const nameTaken = Object.keys(graphs).includes(newName);

  const addEvent = () => {
    const id = newName.trim();
    if (!id || nameTaken) {
      return;
    }
    setValue(
      buildGraphKey(id),
      {
        name: id,
        description: "",
        group,
        cooldown: 0,
        chatnotification: false,
        cooldownnotification: false,
        nodes: [],
        edges: [],
      },
      { shouldDirty: true }
    );
    setNewName("");
    onOpen(id);
  };

  const removeEvent = (id: string) => {
    const next = { ...getValues(GRAPH_KEY) };
    delete next[id];
    setValue(GRAPH_KEY, next, { shouldDirty: true });
  };

  return (
    <Expandable label={group} forceOpen>
      <Stack spacing="small" width="100%">
        {events.length === 0 ? (
          <TypeFace fontSize="medium">No events in this group yet.</TypeFace>
        ) : null}
        {events.map((id) => (
          <Columns key={id} spacing="small">
            <Button label={graphs[id].name} onClick={() => onOpen(id)} />
            <Button icon={faTrash} onClick={() => removeEvent(id)} tooltipText="Delete event" />
          </Columns>
        ))}
        {/* A fixed width: left to fill the row, the input pushes the button out of view. */}
        <Columns spacing="small">
          <TextInput
            width="18rem"
            placeholder="Add Event"
            value={newName}
            onInput={setNewName}
            jsonFriendly
          />
          <Button
            label="Add Event"
            icon={faPlus}
            onClick={addEvent}
            disabled={!newName.trim() || nameTaken}
          />
        </Columns>
        {nameTaken ? <TypeFace fontSize="medium">That event name is taken.</TypeFace> : null}
      </Stack>
    </Expandable>
  );
}

function EventGeneral(props: { eventName: string }) {
  const graphKey = buildGraphKey(props.eventName);
  return (
    <Stack spacing="medium" padding="medium">
      <FormTextInput formKey={buildKey(graphKey, "name")} label="Name:" />
      <FormTextInput formKey={buildKey(graphKey, "description")} label="Description:" />
      <FormNumberInput formKey={buildKey(graphKey, "cooldown")} label="Cooldown (seconds):" />
    </Stack>
  );
}

function EventEditorModal(props: {
  eventName: string | null;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  const { eventName, onClose, onSave, saving } = props;
  const { formState } = useFormContext();

  const pages = useMemo(
    () =>
      eventName
        ? [
            { title: "General", content: <EventGeneral eventName={eventName} /> },
            {
              title: "Nodes",
              content: (
                <NodeGraphHostProvider host={modNodeGraphHost}>
                  <EventNodes eventName={eventName} />
                </NodeGraphHostProvider>
              ),
            },
          ]
        : [],
    [eventName]
  );

  return (
    <MultiPageModal
      title={eventName ?? ""}
      pages={pages}
      headerContent={
        formState.isDirty ? (
          <Button
            label={saving ? "Saving…" : "Save"}
            icon={faSave}
            onClick={onSave}
            disabled={saving}
          />
        ) : null
      }
      isOpen={eventName !== null}
      onClose={onClose}
    />
  );
}
