import { NodeGraphHost } from "@spooder/webui-node-graph";
import {
  useGetNodeManifestQuery,
  useGetOperationNodesQuery,
  useGetPluginEventsFormQuery,
  useGetPluginsQuery,
  useGetResponseHandlersQuery,
  useTriggerNowMutation,
  useVerifyResponseScriptMutation,
} from "../app/api/nodeGraphSlice";

// The mod UI's side of the node graph editor: its own mod-scoped API, handed to the editor
// through the host contract. Each entry calls its hook when the editor calls it, so it runs as a
// hook in the editor's component.
//
// No `components`: the editor falls back to plain fields for the asset and UDP pickers, and a
// plugin's custom event form isn't drawn. The owner's WebUI supplies those.
const modNodeGraphHost: NodeGraphHost = {
  events: {
    getNodeManifest: () => {
      const { data, isLoading, error } = useGetNodeManifestQuery(null);
      return { manifests: data, isLoading, error };
    },
    getOperationNodes: () => {
      const { data, isLoading, error } = useGetOperationNodesQuery(null);
      return { operationNodes: data, isLoading, error };
    },
    getTriggerNow: () => {
      const [triggerNowMutation] = useTriggerNowMutation();
      return {
        triggerNow: (eventName: string, nodeId: string) =>
          triggerNowMutation({ eventName, nodeId }),
      };
    },
    getVerifyResponseScript: () => {
      const [verify] = useVerifyResponseScriptMutation();
      return {
        verifyResponseScript: (command: string, inputMessage: string, script: string) =>
          verify({ command, message: inputMessage, script }),
      };
    },
  },
  plugins: {
    getPlugins: () => {
      const { data, isLoading, error } = useGetPluginsQuery(null);
      return { data, isLoading, error };
    },
    getPluginEventsForm: (pluginName: string) => {
      const { data, isLoading, error } = useGetPluginEventsFormQuery(pluginName);
      return { data, isLoading, error };
    },
  },
  useResponseHandlers: () => {
    const { data, isLoading } = useGetResponseHandlersQuery(null);
    return { data, isLoading };
  },
  // The live OSC feed is the owner's monitor; there's nothing for a moderator to subscribe to.
  useLiveLogging: () => {},
};

export default modNodeGraphHost;
