import { configureStore } from "@reduxjs/toolkit";
import { modApi } from "./api/modSlice";
import { themeApi } from "./api/themeSlice";
import navigationSlice from "./slice/navigationSlice";

const store = configureStore({
  reducer: {
    navigationSlice,
    [modApi.reducerPath]: modApi.reducer,
    [themeApi.reducerPath]: themeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(modApi.middleware)
    .concat(themeApi.middleware),
});
export default store;
export type IRootState = ReturnType<typeof store.getState>;
