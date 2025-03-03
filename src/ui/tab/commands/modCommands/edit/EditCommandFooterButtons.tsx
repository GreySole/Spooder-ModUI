import { Columns, Button, Box } from "@greysole/spooder-component-library";
import React from "react";
import { useFormContext } from "react-hook-form";
import useEvents from "../../../../../app/hooks/useEvents";

interface EditCommandFooterButtonsProps {
  editCommandId: string;
  setEditCommandId: (commandId: string) => void;
}

export default function EditCommandFooterButtons({
  editCommandId,
  setEditCommandId,
}: EditCommandFooterButtonsProps) {
  const { getValues } = useFormContext();
  const { getUpdateModCommand, getRemoveModCommand } = useEvents();
  const { updateModCommand } = getUpdateModCommand();
  const { removeModCommand } = getRemoveModCommand();
  return (
    <Box justifyContent="right">
      <Columns spacing="medium">
        <Button
          label="DELETE"
          onClick={() => removeModCommand(editCommandId)}
        />
        <Button label="Cancel" onClick={() => setEditCommandId("")} />
        <Button
          label="Save"
          onClick={() => updateModCommand(editCommandId, getValues())}
        />
      </Columns>
    </Box>
  );
}
