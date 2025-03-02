import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeVariables:{
        hue: 0,
        saturation: 0.5,
        isDarkTheme: true,
      },
    customSpooder: {
      parts: {
        bigeyeleft: "o",
        bigeyeright: "o",
        littleeyeleft: "\u00ba",
        littleeyeright: "\u00ba",
        fangleft: " ",
        fangright: " ",
        mouth: "\u03c9",
        bodyleft: "(",
        bodyright: ")",
        shortlegleft: "/\\",
        longlegleft: "/╲",
        shortlegright: "/\\",
        longlegright: "╱\\",
      },
      colors: {
        bigeyeleft: "#FFFFFF",
        bigeyeright: "#FFFFFF",
        littleeyeleft: "#FFFFFF",
        littleeyeright: "#FFFFFF",
        fangleft: "#FFFFFF",
        fangright: "#FFFFFF",
        mouth: "#FFFFFF",
        bodyleft: "#FFFFFF",
        bodyright: "#FFFFFF",
        shortlegleft: "#FFFFFF",
        shortlegright: "#FFFFFF",
        longlegleft: "#FFFFFF",
        longlegright: "#FFFFFF",
      },
    },
  },
  reducers: {
    _setHue: (state, action) => {
      state.themeVariables.hue = action.payload;
      localStorage.setItem('themeVariables', JSON.stringify(state.themeVariables));
    },
    _setSaturation: (state, action) => {
      state.themeVariables.saturation = action.payload;
      localStorage.setItem('themeVariables', JSON.stringify(state.themeVariables));
    },
    _setMode: (state, action) => {
      state.themeVariables.isDarkTheme = action.payload;
      localStorage.setItem('themeVariables', JSON.stringify(state.themeVariables));
    },
  },
});

export const { _setHue, _setMode, _setSaturation } = themeSlice.actions;

export default themeSlice.reducer;
