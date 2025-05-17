import { FieldValues } from "react-hook-form";
import {
  useGetModmapQuery,
  useSaveThemeMutation,
  useSetBlacklistMutation,
  useSetEventLockMutation,
  useSetPluginLockMutation,
  useSetSpamguardMutation,
} from "../api/modSlice";

export default function useModeration() {
  function getModmap() {
    const { data, isLoading, error } = useGetModmapQuery(null);
    return { data, isLoading, error };
  }

  function getSetEventLock() {
    const [setEventLockMutation, { isLoading, isSuccess, error }] =
      useSetEventLockMutation();

    function setEventLock(eventName: string, isOn: boolean) {
      setEventLockMutation({ eventName, isOn });
    }

    return { setEventLock, isLoading, isSuccess, error };
  }

  function getSetPluginLock() {
    const [setPluginLockMutation, { isLoading, isSuccess, error }] =
      useSetPluginLockMutation();

    function setPluginLock(
      pluginName: string,
      subLockName: string | undefined,
      isOn: boolean
    ) {
      setPluginLockMutation({ pluginName, subLockName, isOn });
    }

    return { setPluginLock, isLoading, isSuccess, error };
  }

  function getSetBlacklist() {
    const [setBlacklistMutation, { isLoading, isSuccess, error }] =
      useSetBlacklistMutation();
    function setBlacklist(userId: string, isOn: boolean) {
      setBlacklistMutation({ userId, isOn });
    }
    return { setBlacklist, isLoading, isSuccess, error };
  }

  function getSetSpamguard() {
    const [setSpamguardMutation, { isLoading, isSuccess, error }] =
      useSetSpamguardMutation();
    function setSpamguard(isOn: boolean) {
      setSpamguardMutation({ isOn });
    }

    return { setSpamguard, isLoading, isSuccess, error };
  }

  function getSaveTheme() {
    const [saveThemeMutation, { isLoading, isSuccess, error }] =
      useSaveThemeMutation();
    function saveTheme(hue: number, saturation: number, isDarkTheme: boolean) {
      saveThemeMutation({ hue, saturation, isDarkTheme });
    }

    return { saveTheme, isLoading, isSuccess, error };
  }

  return {
    getModmap,
    getSetEventLock,
    getSetPluginLock,
    getSetBlacklist,
    getSetSpamguard,
    getSaveTheme,
  };
}
