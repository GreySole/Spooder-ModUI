import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const themeApi = createApi({
  reducerPath: "themeApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin+"/theme" }),
  endpoints: (builder) => ({
    getModTheme: builder.query({
      query: (user:string) => "/mod_theme?user="+user,
    }),
    getCustomSpooder: builder.query({
        query: () => "/custom_spooder",
      }),
  }),
});

export const {
    useGetModThemeQuery,
    useGetCustomSpooderQuery,
} = themeApi;
