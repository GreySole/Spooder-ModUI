import React, { ReactNode, useState } from "react";
import CreateCommandForm from "./CreateCommandForm";
import { Modal } from "@spooder/webui-component-library";
import CreateCommandButton from "./CreateCommandButton";
import CommmandFormProvider from "../CommandFormProvider";

interface CreateCommandModalProps {
  createCommandModalOpen: boolean;
  setCreateCommandModalOpen: (open: boolean) => void;
}

export default function CreateCommandModal(props: CreateCommandModalProps) {
  const { createCommandModalOpen, setCreateCommandModalOpen } = props;

  return (
    <CommmandFormProvider>
      <Modal
        title="Create Command"
        content={<CreateCommandForm />}
        isOpen={createCommandModalOpen}
        onClose={() => setCreateCommandModalOpen(false)}
        footerContent={
          <CreateCommandButton
            setCreateCommandModalOpen={setCreateCommandModalOpen}
          />
        }
      />
    </CommmandFormProvider>
  );
}
