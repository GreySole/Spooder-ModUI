import { FieldValues, useFormContext } from "react-hook-form";
import { useAddModCommandMutation, useRemoveModCommandMutation, useUpdateModCommandMutation, useVerifyResponseScriptMutation } from "../api/eventSlice";
import { useGetModCommandsQuery } from "../api/modSlice";

export default function useEvents(){
    function getVerifyResponseScript() {
      const [verifyResponseScriptMutation, { isLoading, isSuccess, error }] =
        useVerifyResponseScriptMutation();
  
      async function verifyResponseScript(command: string, inputMessage: string, script: string) {
        //Usually event.username is the uncapitalized version of a username.
        //Spooder replaces this with the capitalized version in runCommands()
          const fd = new FormData();
          fd.append("command", command);
          fd.append("message", inputMessage);
          fd.append("script", script);
          const response = await verifyResponseScriptMutation(fd);
          return response;
      }
  
      return { verifyResponseScript, isLoading, isSuccess, error };
    }

    function getModCommands(){
      const {data, isLoading, isSuccess, error, refetch} = useGetModCommandsQuery(null);
      return {data, isLoading, isSuccess, error, refetch};
    }

    function getAddModCommand(){
        const [addModCommandMutation, {isLoading, isSuccess, error}] = useAddModCommandMutation();
        async function addModCommand(values: FieldValues){
          const form = new FormData();
          for(const key in values){
              form.append(key, values[key]);
          }
          const response = await addModCommandMutation(form);
          return response;
        }
        return {addModCommand, isLoading, isSuccess, error};
    }

    function getUpdateModCommand(){
        const [updateModCommandMutation, {isLoading, isSuccess, error}] = useUpdateModCommandMutation();
        async function updateModCommand(commandId:string, values: FieldValues){
            const form = new FormData();
            form.append("commandId", commandId);
            for(const key in values){
                form.append(key, values[key]);
            }
            const response = await updateModCommandMutation(form);
            return response;
        }
        return {updateModCommand, isLoading, isSuccess, error};
    }

    function getRemoveModCommand(){
        const [removeModCommandMutation, {isLoading, isSuccess, error}] = useRemoveModCommandMutation();
        async function removeModCommand(commandId:string){
            const form = new FormData();
            form.append("commandId", commandId);
            const response = await removeModCommandMutation(form);
            return response;
        }
        return {removeModCommand, isLoading, isSuccess, error};
    }

    return {getModCommands, getVerifyResponseScript, getAddModCommand, getUpdateModCommand, getRemoveModCommand};
}