import type { ModuleApi, ModuleDefinition } from "@spooder/webui-module-sdk";
import { setModuleSource } from "@spooder/webui-node-graph";
import { injectModuleApi } from "../app/store";
import { getModules, subscribeToModules } from "./registry";

function asApiList(api: ModuleApi | ModuleApi[]): ModuleApi[] {
  return Array.isArray(api) ? api : [api];
}

// A module's own components read its api from the store, so it has to be mounted before they
// render - which is why it's injected the moment the module registers.
function injectApis(modules: readonly ModuleDefinition[]) {
  for (const m of modules) {
    for (const api of asApiList(m.api)) {
      injectModuleApi(api);
    }
  }
}

/**
 * Feeds the module registry to the node editor (which reads modules through a source it's
 * handed) and keeps their apis on the store. Run once, before anything renders.
 */
export default function startModuleBootstrap() {
  setModuleSource({ getModules, subscribe: subscribeToModules });
  injectApis(getModules());
  subscribeToModules(() => injectApis(getModules()));
}
