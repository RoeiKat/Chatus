import { useAppSelector } from "./store/hooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Spinner } from "react-bootstrap";
import "./App.css";

import { Chat } from "./Components/Chat";
import { Users } from "./Components/Users";
function App() {
  const { checkAuth, loading } = useAppSelector((state) => state.user);

  useLocalStorage();

  return (
    <div
      className="d-flex align-items-center justify-content-center border border-light"
      style={{ height: "100vh" }}
    >
      {!checkAuth ? <Users /> : <Chat />}
    </div>
  );
}

export default App;
