import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modApi = createApi({
  reducerPath: "modApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin+"/mod/api" }),
  endpoints: (builder) => ({
    getUtilities: builder.query({
      query: () => "/utilities",
    }),
    setEventLock: builder.mutation({
      query: (form) => ({
        url: "/lock/event",
        method: "post",
        body: form,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    setPluginLock: builder.mutation({
      query: (form) => ({
        url: "/lock/plugin",
        method: "post",
        body: form,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    setBlacklist: builder.mutation({
      query: (form) => ({
        url: "/blacklist",
        method: "post",
        body: form,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    setSpamguard: builder.mutation({
      query: (form) => ({
        url: "/spamguard",
        method: "post",
        body: form,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    saveTheme: builder.mutation({
      query: (form) => ({
        url: "/save_theme",
        method: "post",
        body: form,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetUtilitiesQuery,
  useSetEventLockMutation,
  useSetPluginLockMutation,
  useSetBlacklistMutation,
  useSetSpamguardMutation,
  useSaveThemeMutation,
} = modApi;
