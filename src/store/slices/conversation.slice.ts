import { createSlice } from "@reduxjs/toolkit";
import { getConversations } from "../../API/Chat/conversations-get";
import { Conversation } from "../../Interface/conversation.interface";

interface ConversationsInitialState {
  currentConversation: Conversation | null;
  conversations: Conversation[] | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: ConversationsInitialState = {
  currentConversation: null,
  conversations: null,
  loading: false,
  error: undefined,
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setCurrentConversation(state, action) {
      const conversation: Conversation = action.payload;
      state.currentConversation = conversation;
    },
    exitConversation(state) {
      state.currentConversation = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.conversations;
        console.log("gotHere");
        state.loading = false;
      })
      .addCase(getConversations.rejected, (state, action) => {
        const errorMessage = action.payload?.toString();
        state.loading = false;
        state.error = errorMessage;
      });
  },
});

export const conversationActions = conversationSlice.actions;

export default conversationSlice;
