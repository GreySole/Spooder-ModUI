import React from "react";
import { useFormContext } from "react-hook-form";
import useEvents from "../../../../../app/hooks/useEvents";
import { Button } from "@greysole/spooder-component-library";

interface CreateCommandButtonProps {
  setCreateCommandModalOpen: (open: boolean) => void;
}

export default function CreateCommandButton(props: CreateCommandButtonProps) {
  const { setCreateCommandModalOpen } = props;
  const { getAddModCommand } = useEvents();
  const { addModCommand } = getAddModCommand();
  const { getValues } = useFormContext();

  return (
    <Button
      label="Create Command"
      onClick={() => {
        addModCommand(getValues());
        setCreateCommandModalOpen(false);
      }}
    />
  );
}
