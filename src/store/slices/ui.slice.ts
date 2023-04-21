import { createSlice } from "@reduxjs/toolkit";

interface UiInitialState {
  initalLoad: boolean;
}

const initialState: UiInitialState = {
  initalLoad: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setInitialLoad(state) {
      state.initalLoad = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
