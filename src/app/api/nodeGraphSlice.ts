import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// The mod-facing side of the node graph editor: every call goes to /mod, where the server limits
// it to the event groups the owner opened to moderators.
export const nodeGraphApi = createApi({
  reducerPath: "nodeGraphApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin + "/mod" }),
  tagTypes: ["EventGraphs"],
  endpoints: (builder) => ({
    getEventGraphs: builder.query({
      query: () => "/event_graphs",
      providesTags: ["EventGraphs"],
    }),
    saveEventGraphs: builder.mutation({
      query: (form) => ({
        url: "/save_event_graphs",
        method: "post",
        body: form,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["EventGraphs"],
    }),
    getNodeManifest: builder.query({ query: () => "/node_manifest" }),
    getOperationNodes: builder.query({ query: () => "/operation_nodes" }),
    getPlugins: builder.query({ query: () => "/plugins" }),
    getPluginEventsForm: builder.query({
      query: (pluginName: string) =>
        "/plugin_events_form?plugin=" + encodeURIComponent(pluginName),
    }),
    getResponseHandlers: builder.query({ query: () => "/response_handlers" }),
    triggerNow: builder.mutation({
      query: ({ eventName, nodeId }) => ({
        url: `/event_graphs/${encodeURIComponent(eventName)}/nodes/${encodeURIComponent(nodeId)}/trigger_now`,
        method: "post",
      }),
    }),
    verifyResponseScript: builder.mutation({
      query: (form) => ({
        url: "/verify_response_script",
        method: "post",
        body: form,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
    }),
  }),
});

export const {
  useGetEventGraphsQuery,
  useSaveEventGraphsMutation,
  useGetNodeManifestQuery,
  useGetOperationNodesQuery,
  useGetPluginsQuery,
  useGetPluginEventsFormQuery,
  useGetResponseHandlersQuery,
  useTriggerNowMutation,
  useVerifyResponseScriptMutation,
} = nodeGraphApi;
