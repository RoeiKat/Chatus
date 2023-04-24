import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./slices/ui.slice";
import userSlice from "./slices/user.slice";
import conversationSlice from "./slices/conversation.slice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    conversations: conversationSlice.reducer,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
