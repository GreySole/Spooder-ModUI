import type { ModuleDefinition } from "@spooder/webui-module-sdk";
import { loadRemote, registerRemotes } from "@module-federation/runtime";
import { recordModuleFailure, registerModule, setActiveModules } from "./registry";

// The mod UI doesn't show module tabs - it loads the installed WebUI modules only for what they
// contribute to the node editor: node inspectors, test panels and field renderers. Otherwise
// this is the owner's WebUI loader, reading the module list from the mod routes instead.
interface RemoteModuleInfo {
  key: string;
  url: string;
  version?: string;
}

export async function syncActiveModules(): Promise<void> {
  try {
    const response = await fetch("/mod/module_loaded");
    if (!response.ok) {
      return;
    }
    const loaded = await response.json();
    if (Array.isArray(loaded)) {
      setActiveModules(loaded);
    }
  } catch (e) {
    console.warn("Could not ask which modules are loaded; showing all of them.", e);
  }
}

export default async function loadRemoteModules(): Promise<void> {
  let installed: RemoteModuleInfo[];
  try {
    const response = await fetch("/mod/module_ui");
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    installed = await response.json();
  } catch (e) {
    console.warn("Could not list module UIs; loading none.", e);
    return;
  }

  if (!Array.isArray(installed) || installed.length === 0) {
    return;
  }

  registerRemotes(
    installed.map((m) => ({ name: m.key, entry: m.url })),
    { force: false }
  );

  // Settled, not all: one module failing to load must not cost the others their panels.
  const results = await Promise.allSettled(
    installed.map(async (m) => {
      const loaded = await loadRemote<{ default: ModuleDefinition }>(`${m.key}/module`);
      if (!loaded?.default) {
        throw new Error(`${m.key} exposed no module definition`);
      }
      registerModule(loaded.default);
    })
  );

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`Module '${installed[i].key}' failed to load:`, result.reason);
      recordModuleFailure(
        installed[i].key,
        result.reason instanceof Error ? result.reason.message : String(result.reason)
      );
    }
  });
}
