import { createSlice } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";

interface TabOptions {
  [key: string]: string;
}

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    tabOptions: {
      commands: "Commands",
      plugins: "Plugins",
      utilities: "Utilities",
      theme: "Theme",
    } as TabOptions,
    currentTab:
      new URLSearchParams(window.location.search).get("tab") ?? "commands",
    navigationOpen: false,
    stayHere: window.location.search.includes("tab"),
  },
  reducers: {
    _setTab: (state, action) => {
      state.currentTab = action.payload.tab;
    },
    _toggleNavigation: (state) => {
      state.navigationOpen = !state.navigationOpen;
    },
    _setNavigation: (state, action) => {
      state.navigationOpen = action.payload.isOpen;
    },
  },
});

export const { _setTab, _toggleNavigation, _setNavigation } =
  navigationSlice.actions;

export default navigationSlice.reducer;
