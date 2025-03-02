import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modApi = createApi({
  reducerPath: "modApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin+"/mod" }),
  endpoints: (builder) => ({
    getModmap: builder.query({
      query: () => "/modmap",
    }),
    setEventLock: builder.mutation({
      query: (form) => ({
        url: "/lock/event",
        method: "post",
        body: form,
      }),
    }),
    setPluginLock: builder.mutation({
      query: (form) => ({
        url: "/lock/plugin",
        method: "post",
        body: form,
      }),
    }),
    setBlacklist: builder.mutation({
      query: (form) => ({
        url: "/blacklist",
        method: "post",
        body: form,
      }),
    }),
    setSpamguard: builder.mutation({
      query: (form) => ({
        url: "/spamguard",
        method: "post",
        body: form,
      }),
    }),
    saveTheme: builder.mutation({
      query: (form) => ({
        url: "/save_theme",
        method: "post",
        body: form,
      }),
    }),
  }),
});

export const {
  useGetModmapQuery,
  useSetEventLockMutation,
  useSetPluginLockMutation,
  useSetBlacklistMutation,
  useSetSpamguardMutation,
  useSaveThemeMutation,
} = modApi;
