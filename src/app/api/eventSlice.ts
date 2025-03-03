import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin+"/mod" }),
  endpoints: (builder) => ({
    verifyResponseScript: builder.mutation({
      query: (form) => ({
        url: '/verify_response_script',
        method: 'post',
        body: form
      }),
    }),
    addModCommand: builder.mutation({
      query: (form) => ({
        url: "/add_mod_command",
        method: "post",
        body: form,
      }),
    }),
    updateModCommand: builder.mutation({
      query: (form) => ({
        url: "/update_mod_command",
        method: "post",
        body: form,
      }),
    }),
    removeModCommand: builder.mutation({
      query: (form) => ({
        url: "/remove_mod_command",
        method: "post",
        body: form,
      }),
    }),
  }),
});

export const {
    useVerifyResponseScriptMutation,
    useAddModCommandMutation,
    useUpdateModCommandMutation,
    useRemoveModCommandMutation,
} = eventApi;
