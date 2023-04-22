import { baseUrl } from "../baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatusStorage } from "../../Interface/storage.interface";

const URL = `${baseUrl}/chat/`;

export const getConversations = createAsyncThunk(
  "/conversations/getConversations",
  (data: { stateToken: string | null }, thunkApi) => {
    const { stateToken } = data;
    const storage: ChatusStorage = JSON.parse(
      localStorage.getItem("chatusLS")!
    );
    if (!storage) throw new Error("No storage found!");
    else if (stateToken?.toString() !== storage.token?.toString())
      throw new Error("Token error!");
    return fetch(URL, {
      headers: {
        Authorization: `Bearer ${storage.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .catch((error) => {
        thunkApi.rejectWithValue(error.message);
      });
  }
);

export const getMessages = function (conversationId: string) {
  const storage = JSON.parse(localStorage.getItem("chatusLS")!);
  return fetch(`${URL}${conversationId}`, {
    headers: {
      Authorization: `Bearer ${storage.token}`,
    },
  })
    .then((results) => {
      if (!results.ok) {
        throw new Error("Something went wrong");
      } else {
        return results.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
