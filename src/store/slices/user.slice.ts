import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../API/User/user-login";

interface UserInitalState {
  userId: string | null;
  token: string | null;
  loading: boolean;
  checkAuth: boolean;
  color: string | undefined;
  username: string | null;
  expiryDate: string | null;
  error: string | undefined;
}

const initialState: UserInitalState = {
  userId: null,
  token: null,
  expiryDate: null,
  loading: false,
  color: undefined,
  username: null,
  checkAuth: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.checkAuth = false;
      state.token = null;
      state.userId = null;
      state.expiryDate = null;
      localStorage.removeItem("chatusLS");
    },
    automaticLogin(state, action) {
      const { token, userId, expiryDate, color, username } = action.payload;
      state.token = token;
      state.username = username;
      state.color = color;
      state.userId = userId;
      state.expiryDate = expiryDate;
      state.checkAuth = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetError(state) {
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const hours = 24;
        const remainingMS = 60 * 60 * hours * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMS);
        const { userId, token, color, username } = action.payload;
        state.color = color;
        state.username = username;
        state.loading = false;
        state.token = token;
        state.userId = userId;
        state.expiryDate = expiryDate.toISOString();
        localStorage.setItem(
          "chatusLS",
          JSON.stringify({
            token,
            userId,
            color,
            username,
            expirtDate: expiryDate.toISOString(),
          })
        );
        state.checkAuth = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        const errorMessage = action.payload?.toString();
        state.error = errorMessage;
        state.loading = false;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
