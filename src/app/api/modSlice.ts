import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modApi = createApi({
  reducerPath: "modApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin + "/mod" }),
  endpoints: (builder) => ({
    getModmap: builder.query({
      query: () => "/modmap",
    }),
    getModCommands: builder.query({
      query: () => "/get_mod_commands",
    }),
    setEventLock: builder.mutation({
      query: (form) => ({
        url: "/lock/event",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
    setPluginLock: builder.mutation({
      query: (form) => ({
        url: "/lock/plugin",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
    setBlacklist: builder.mutation({
      query: (form) => ({
        url: "/blacklist",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
    setSpamguard: builder.mutation({
      query: (form) => ({
        url: "/spamguard",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
    stopAllEvents: builder.mutation({
      query: (form) => ({
        url: "/stop_all_events",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
    setLockdown: builder.mutation({
      query: (form) => ({
        url: "/set_lockdown",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
    saveTheme: builder.mutation({
      query: (form) => ({
        url: "/save_theme",
        method: "post",
        body: form,
        contentType: "application/json",
      }),
    }),
  }),
});

export const {
  useGetModmapQuery,
  useGetModCommandsQuery,
  useSetEventLockMutation,
  useSetPluginLockMutation,
  useSetBlacklistMutation,
  useSetSpamguardMutation,
  useSaveThemeMutation,
} = modApi;
