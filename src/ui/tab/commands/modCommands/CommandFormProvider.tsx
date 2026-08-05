import { KeyedObject } from "@spooder/webui-component-library/dist/types/Types";
import React, { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

interface CreateCommandFormProviderProps {
  children: ReactNode;
  customDefaultValues?: KeyedObject;
}

export default function CommmandFormProvider({
  children,
  customDefaultValues,
}: CreateCommandFormProviderProps) {
  const CreateCommandFormValues = useForm(
    customDefaultValues
      ? { defaultValues: customDefaultValues }
      : {
          defaultValues: {
            command: "!",
            search: false,
            vip: false,
            mod: false,
            sub: false,
            broadcaster: false,
            script: "",
          },
        }
  );

  return <FormProvider {...CreateCommandFormValues}>{children}</FormProvider>;
}
