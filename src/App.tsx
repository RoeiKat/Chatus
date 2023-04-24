import { useEffect } from "react";
import { useSocket } from "./hooks/useSocket";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAppSelector, useAppDispatch } from "./store/hooks";

import { baseUrl } from "./API/baseUrl";
import { uiActions } from "./store/slices/ui.slice";
import * as socketIO from "socket.io-client";

import "./App.css";

import { Chat } from "./Components/Chat";
import { Users } from "./Components/Users";
import { Spinner } from "react-bootstrap";

const socket = socketIO.connect(baseUrl, { transports: ["websocket"] });

function App() {
  const dispatch = useAppDispatch();
  const { checkAuth } = useAppSelector((state) => state.user);

  const { initalLoad } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (window.innerWidth < 1025) {
      dispatch(uiActions.setMobile(true));
    } else {
      dispatch(uiActions.setMobile(false));
    }
  }, [dispatch]);

  useSocket(socket);

  useLocalStorage();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {!initalLoad ? (
        <>{!checkAuth ? <Users /> : <Chat socket={socket} />}</>
      ) : (
        <Spinner variant="light" />
      )}
    </div>
  );
}

export default App;
