import { FieldValues } from "react-hook-form";
import {
  useVerifyResponseScriptMutation,
  useAddModCommandMutation,
  useUpdateModCommandMutation,
  useRemoveModCommandMutation,
} from "../api/eventSlice";
import { useGetModCommandsQuery } from "../api/modSlice";

export default function useEvents() {
  function getVerifyResponseScript() {
    const [verifyResponseScriptMutation, { isLoading, isSuccess, error }] =
      useVerifyResponseScriptMutation();

    async function verifyResponseScript(
      command: string,
      inputMessage: string,
      script: string
    ) {
      const response = await verifyResponseScriptMutation({
        command,
        inputMessage,
        script,
      });
      return response;
    }

    return { verifyResponseScript, isLoading, isSuccess, error };
  }

  function getModCommands() {
    const { data, isLoading, isSuccess, error, refetch } =
      useGetModCommandsQuery(null);
    return { data, isLoading, isSuccess, error, refetch };
  }

  function getAddModCommand() {
    const [addModCommandMutation, { isLoading, isSuccess, error }] =
      useAddModCommandMutation();
    async function addModCommand(values: FieldValues) {
      const response = await addModCommandMutation(values);
      return response;
    }
    return { addModCommand, isLoading, isSuccess, error };
  }

  function getUpdateModCommand() {
    const [updateModCommandMutation, { isLoading, isSuccess, error }] =
      useUpdateModCommandMutation();
    async function updateModCommand(commandId: string, values: FieldValues) {
      const response = await updateModCommandMutation({ commandId, ...values });
      return response;
    }
    return { updateModCommand, isLoading, isSuccess, error };
  }

  function getRemoveModCommand() {
    const [removeModCommandMutation, { isLoading, isSuccess, error }] =
      useRemoveModCommandMutation();
    async function removeModCommand(commandId: string) {
      const response = await removeModCommandMutation({ commandId });
      return response;
    }
    return { removeModCommand, isLoading, isSuccess, error };
  }

  return {
    getModCommands,
    getVerifyResponseScript,
    getAddModCommand,
    getUpdateModCommand,
    getRemoveModCommand,
  };
}
