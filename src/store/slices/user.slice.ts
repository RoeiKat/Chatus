import { createSlice } from "@reduxjs/toolkit";

interface UserInitalState {
  userId: string | null;
  token: string | null;
  loading: boolean;
  checkAuth: boolean;
  expiryDate: string | null;
  error: string | null;
}

const initialState: UserInitalState = {
  userId: null,
  token: null,
  expiryDate: null,
  loading: false,
  checkAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice;
