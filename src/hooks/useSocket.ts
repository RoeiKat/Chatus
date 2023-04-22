import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { uiActions } from "../store/slices/ui.slice";
import * as socketio from "socket.io-client";

export const useSocket = function (socket: socketio.Socket) {
  const dispatch = useAppDispatch();
  const { checkAuth, userId } = useAppSelector((state) => state.user);
  socket.on("getUsers", (data) => {
    dispatch(uiActions.setOnlineUsers(data));
  });
  useEffect(() => {
    if (checkAuth) {
      socket.emit("addUser", userId);
    }
  }, [checkAuth, socket, userId]);
};
