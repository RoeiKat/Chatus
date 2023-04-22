import { useAppSelector } from "./store/hooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSocket } from "./hooks/useSocket";
import * as socketIO from "socket.io-client";
import { baseUrl } from "./API/baseUrl";

import "./App.css";

import { Chat } from "./Components/Chat";
import { Users } from "./Components/Users";

const socket = socketIO.connect(baseUrl, { transports: ["websocket"] });

function App() {
  const { checkAuth } = useAppSelector((state) => state.user);

  // const { initalLoad } = useAppSelector((state) => state.ui);

  useSocket(socket);

  useLocalStorage();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {!checkAuth ? <Users /> : <Chat socket={socket} />}
    </div>
  );
}

export default App;
