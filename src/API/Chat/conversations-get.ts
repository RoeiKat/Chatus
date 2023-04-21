import { baseUrl } from "../baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store/store";
import { conversationActions } from "../../store/slices/conversation.slice";
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
        console.log("Got HERE");
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

export const getSingleConversation = function (conversationId: string) {
  const token = localStorage.getItem("token");
  return (dispatch: AppDispatch) => {
    const getData = fetch(`${URL}${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getData
      .then((results) => {
        if (!results.ok) {
          return results.json().then((foundError) => {
            throw new Error(foundError.message);
          });
        } else {
          return results.json();
        }
      })
      .then((conversation) => {
        dispatch(conversationActions.setCurrentConversation(conversation));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
