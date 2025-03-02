import React, { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateCommandForm from "./CreateCommandForm";

export default function CreateCommandModalContent() {
  const CreateCommandFormValues = useForm({
    defaultValues: {
      command: "!",
      search: false,
      vip: false,
      mod: false,
      sub: false,
      broadcaster: false,
      script: "",
    },
  });
  return (
    <FormProvider {...CreateCommandFormValues}>
      <CreateCommandForm />
    </FormProvider>
  );
}
