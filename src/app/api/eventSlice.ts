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
  }),
});

export const {
    useVerifyResponseScriptMutation
} = eventApi;
