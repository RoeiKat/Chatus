import { createSlice } from "@reduxjs/toolkit";

interface SocketsData {
  socketId: string;
  userId: string;
}

interface UiInitialState {
  initalLoad: boolean;
  onlineUsers: SocketsData[];
  isMobile: boolean;
}

const initialState: UiInitialState = {
  initalLoad: true,
  onlineUsers: [],
  isMobile: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobile(state, action) {
      state.isMobile = action.payload;
    },
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
