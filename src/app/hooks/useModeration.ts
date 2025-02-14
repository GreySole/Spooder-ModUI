import { FieldValues } from "react-hook-form";
import { useGetUtilitiesQuery, useSaveThemeMutation, useSetBlacklistMutation, useSetEventLockMutation, useSetPluginLockMutation, useSetSpamguardMutation } from "../api/modSlice";

export default function useModeration(){
    function getUtilities(){
        const {data, isLoading, error} = useGetUtilitiesQuery(null);
        return {data, isLoading, error};
    }

    function setEventLock(eventName:string, isOn:boolean){
        const [setEventLockMutation, {isLoading, isSuccess, error}] = useSetEventLockMutation();

        const formData = new FormData();
        formData.append("eventName", eventName);
        formData.append("isOn", isOn.toString());

        setEventLockMutation(formData);
    }

    function setPluginLock(pluginName:string, subLockName:string | undefined, isOn:boolean){
        const [setPluginLockMutation, {isLoading, isSuccess, error}] = useSetPluginLockMutation();

        const formData = new FormData();
        formData.append("pluginName", pluginName);
        if(subLockName){
            formData.append("subLockName", subLockName);
        }
        formData.append("isOn", isOn.toString());

        setPluginLockMutation(formData);
    }

    function setBlacklist(userId:string, isOn:boolean){
        const [setBlacklistMutation, {isLoading, isSuccess, error}] = useSetBlacklistMutation();
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("isOn", isOn.toString());

        setBlacklistMutation(formData);
    }

    function setSpamguard(isOn:boolean){
        const [setSpamguardMutation, {isLoading, isSuccess, error}] = useSetSpamguardMutation();
        const formData = new FormData();
        formData.append("isOn", isOn.toString());

        setSpamguardMutation(formData);
    }

    function saveTheme(form:FieldValues){
        const [saveThemeMutation, {isLoading, isSuccess, error}] = useSaveThemeMutation();
        const formData = new FormData();
        for (const [key, value] of Object.entries(form)) {
            formData.append(key, value);
        }

        saveThemeMutation(formData);
    }

    return {getUtilities, setEventLock, setPluginLock, setBlacklist, setSpamguard, saveTheme};
}