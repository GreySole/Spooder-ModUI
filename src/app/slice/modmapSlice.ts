import { KeyedObject } from "@greysole/spooder-component-library/dist/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import navigationSlice from "./navigationSlice";

export const modmapSlice = createSlice({
  name: "modmap",
  initialState: {
    lockdown: 0,
    spamguard: 0,
    commands:{} as KeyedObject,
    plugins:{} as KeyedObject,
    activeEvents: {} as KeyedObject,
    eventLocks: {} as KeyedObject,
    pluginLocks: {} as KeyedObject,
    blacklist: {} as KeyedObject,
  },
  reducers: {
    _setInitialData: (state, action) => {
      console.log("SET INITIAL DATA",state.commands,  action.payload.events);
      state.lockdown = action.payload.lockdown;
      state.spamguard = action.payload.spamguard;
      state.commands = action.payload.commands;
      state.activeEvents = action.payload.active_events;
      state.eventLocks = action.payload.modlocks.events;
      state.plugins = action.payload.plugins;
      state.pluginLocks = action.payload.modlocks.plugins;
      state.blacklist = action.payload.modlocks.blacklist;
    },
    _setLockdown: (state, action) => {
      state.lockdown = action.payload.lockdown;
    },
    _setSpamguard: (state, action) => {
      state.spamguard = action.payload.spamguard;
    },
    _setEventLock: (state, action) => {
      state.eventLocks[action.payload.eventName] = action.payload.isLocked;
    },
    _setPluginLock: (state, action) => {
      console.log("PLUGIN LOCK", action.payload);
      if (action.payload.subLockName) {
        console.log("PLUGIN SUBLOCK");
        state.plugins[action.payload.pluginName].modmap.locks[
          action.payload.subLockName
        ] = action.payload.isLocked ? 1:0;
      } else {
        console.log("PLUGIN FULL LOCK");
        state.pluginLocks[action.payload.pluginName] = action.payload.isLocked ? 1:0;
      }
    },
    _addActiveEvent: (state, action) => {
      state.activeEvents[action.payload.eventName] = action.payload.eventData;
    },
    _removeActiveEvent: (state, action) => {
      delete state.activeEvents[action.payload.eventName];
    },
  },
});

export const {
  _setInitialData,
  _setLockdown,
  _setSpamguard,
  _setEventLock,
  _setPluginLock,
  _addActiveEvent,
  _removeActiveEvent,
} = modmapSlice.actions;

export default modmapSlice.reducer;
