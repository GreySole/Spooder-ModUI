import { combineReducers, configureStore, createDynamicMiddleware } from "@reduxjs/toolkit";
import type { ModuleApi } from "@spooder/webui-module-sdk";
import { configApi, serverApi } from "@spooder/webui-module-sdk";
import { modApi } from "./api/modSlice";
import { themeApi } from "./api/themeSlice";
import { nodeGraphApi } from "./api/nodeGraphSlice";
import navigationSlice from "./slice/navigationSlice";
import modmapSlice from "./slice/modmapSlice";
import { eventApi } from "./api/eventSlice";

// A WebUI module's api arrives with the module, after the store exists, so its reducer and
// middleware are added to the running store - the same arrangement as the owner's WebUI.
const dynamicMiddleware = createDynamicMiddleware();

const coreReducers = {
  navigationSlice,
  modmapSlice,
  [modApi.reducerPath]: modApi.reducer,
  [themeApi.reducerPath]: themeApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [nodeGraphApi.reducerPath]: nodeGraphApi.reducer,
  // Modules written against the SDK read these through useConfig/useServer.
  [configApi.reducerPath]: configApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer,
};

const injectedReducers: { [reducerPath: string]: any } = {};

const store = configureStore({
  reducer: coreReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(modApi.middleware)
      .concat(themeApi.middleware)
      .concat(eventApi.middleware)
      .concat(nodeGraphApi.middleware)
      .concat(configApi.middleware)
      .concat(serverApi.middleware)
      .concat(dynamicMiddleware.middleware),
});

/** Mounts one module api on the running store. Safe to call twice for the same api. */
export function injectModuleApi(api: ModuleApi) {
  if (injectedReducers[api.reducerPath]) {
    return;
  }
  injectedReducers[api.reducerPath] = api.reducer;
  store.replaceReducer(combineReducers({ ...coreReducers, ...injectedReducers }));
  dynamicMiddleware.addMiddleware(api.middleware);
}

export default store;
export type IRootState = ReturnType<typeof store.getState>;
