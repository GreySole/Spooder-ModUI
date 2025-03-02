import { FieldValues } from "react-hook-form";
import { useGetModmapQuery, useSaveThemeMutation, useSetBlacklistMutation, useSetEventLockMutation, useSetPluginLockMutation, useSetSpamguardMutation } from "../api/modSlice";

export default function useModeration(){
    function getModmap(){
        const {data, isLoading, error} = useGetModmapQuery(null);
        return {data, isLoading, error};
    }

    function getSetEventLock(){
        const [setEventLockMutation, {isLoading, isSuccess, error}] = useSetEventLockMutation();

        function setEventLock(eventName:string, isOn:boolean){
            const formData = new FormData();
            formData.append("eventName", eventName);
            formData.append("isOn", isOn.toString());

            setEventLockMutation(formData);
        }

        return {setEventLock, isLoading, isSuccess, error};
    }

    function getSetPluginLock(){
        const [setPluginLockMutation, {isLoading, isSuccess, error}] = useSetPluginLockMutation();

        function setPluginLock(pluginName:string, subLockName:string | undefined, isOn:boolean){
            const formData = new FormData();
            formData.append("pluginName", pluginName);
            if(subLockName){
                formData.append("subLockName", subLockName);
            }
            formData.append("isOn", isOn.toString());

            setPluginLockMutation(formData);
        }
        
        return {setPluginLock, isLoading, isSuccess, error};
    }

    function getSetBlacklist(){
        const [setBlacklistMutation, {isLoading, isSuccess, error}] = useSetBlacklistMutation();
        function setBlacklist(userId:string, isOn:boolean){
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("isOn", isOn.toString());

            setBlacklistMutation(formData);
        }
        return {setBlacklist, isLoading, isSuccess, error};
    }

    function getSetSpamguard(){
        const [setSpamguardMutation, {isLoading, isSuccess, error}] = useSetSpamguardMutation();
        function setSpamguard(isOn:boolean){
            const formData = new FormData();
            formData.append("isOn", isOn.toString());

            setSpamguardMutation(formData);
        }

        return {setSpamguard, isLoading, isSuccess, error};
    }

    function getSaveTheme(form:FieldValues){
        const [saveThemeMutation, {isLoading, isSuccess, error}] = useSaveThemeMutation();
        function saveTheme(form:FieldValues){
            const formData = new FormData();
            formData.append("theme", form.theme);

            saveThemeMutation(formData);
        }

        return {saveTheme, isLoading, isSuccess, error};
    }

    return {getModmap, getSetEventLock, getSetPluginLock, getSetBlacklist, getSetSpamguard, getSaveTheme};
}