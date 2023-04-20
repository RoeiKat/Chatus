import { baseUrl } from "../baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = `${baseUrl}/user/login`;

type LoginInfo = {
  email: string;
  password: string;
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  (data: LoginInfo, thunkApi) => {
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid email or password");
        }
        return res.json();
      })
      .catch((error) => {
        return thunkApi.rejectWithValue(error.message);
      });
  }
);
