import { baseUrl } from "../baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store/store";
import { conversationActions } from "../../store/slices/conversation.slice";

const URL = `${baseUrl}/chat/`;

export const getConversations = createAsyncThunk(
  "/conversations/getConversations",
  (data: { stateToken: string }, thunkApi) => {
    const { stateToken } = data;
    const token = localStorage.getItem("token");
    if (stateToken.toString() !== token?.toString())
      throw new Error("Token error!");
    return fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
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
