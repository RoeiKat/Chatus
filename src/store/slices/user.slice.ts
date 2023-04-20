import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../API/User/user-login";

interface UserInitalState {
  userId: string | null;
  token: string | null;
  loading: boolean;
  checkAuth: boolean;
  expiryDate: string | null;
  error: string | undefined;
}

const initialState: UserInitalState = {
  userId: null,
  token: null,
  expiryDate: null,
  loading: true,
  checkAuth: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.checkAuth = false;
      localStorage.removeItem("token");
      state.token = null;
      localStorage.removeItem("userId");
      state.userId = null;
      localStorage.removeItem("expiryDate");
      state.expiryDate = null;
    },
    automaticLogin(state, action) {
      const { token, userId, expiryDate } = action.payload;
      state.token = token;
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
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.error = undefined;
        const hours = 24;
        const remainingMS = 60 * 60 * hours * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMS);
        const { userId, token } = action.payload;
        state.loading = false;
        localStorage.setItem("token", token);
        state.token = token;
        localStorage.setItem("userId", userId);
        state.userId = userId;
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        state.expiryDate = expiryDate.toISOString();
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
