import { configureStore } from "@reduxjs/toolkit";
import { modApi } from "./api/modSlice";
import { themeApi } from "./api/themeSlice";
import navigationSlice from "./slice/navigationSlice";
import modmapSlice from "./slice/modmapSlice";
import { eventApi } from "./api/eventSlice";

const store = configureStore({
  reducer: {
    navigationSlice,
    modmapSlice,
    [modApi.reducerPath]: modApi.reducer,
    [themeApi.reducerPath]: themeApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(modApi.middleware)
    .concat(themeApi.middleware)
    .concat(eventApi.middleware)
});
export default store;
export type IRootState = ReturnType<typeof store.getState>;
