import { createSlice } from "@reduxjs/toolkit";

interface SocketsData {
  socketId: string;
  userId: string;
}

interface UiInitialState {
  initalLoad: boolean;
  onlineUsers: SocketsData[];
}

const initialState: UiInitialState = {
  initalLoad: true,
  onlineUsers: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setInitialLoad(state) {
      state.initalLoad = false;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
