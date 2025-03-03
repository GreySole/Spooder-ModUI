import React from "react";
import useEvents from "../../../../../app/hooks/useEvents";
import CommmandFormProvider from "../CommandFormProvider";
import { Button, Columns, Modal } from "@greysole/spooder-component-library";
import CreateCommandButton from "../create/CreateCommandButton";
import CreateCommandForm from "../create/CreateCommandForm";
import EditCommandForm from "./EditCommandForm";
import { error } from "console";
import { useFormContext } from "react-hook-form";
import EditCommandFooterButtons from "./EditCommandFooterButtons";

interface CreateCommandModalProps {
  editCommandId: string;
  setEditCommandId: (open: string) => void;
}

export default function EditCommandModal(props: CreateCommandModalProps) {
  const { editCommandId, setEditCommandId } = props;
  const { getModCommands } = useEvents();
  const { data, isLoading, error } = getModCommands();
  if (isLoading || error || editCommandId === "") {
    return null;
  }

  const modCommand = data[editCommandId];

  return (
    <CommmandFormProvider customDefaultValues={modCommand}>
      <Modal
        title={modCommand.command}
        content={<EditCommandForm />}
        isOpen={editCommandId !== ""}
        onClose={() => setEditCommandId("")}
        footerContent={
          <EditCommandFooterButtons
            editCommandId={editCommandId}
            setEditCommandId={setEditCommandId}
          />
        }
      />
    </CommmandFormProvider>
  );
}
