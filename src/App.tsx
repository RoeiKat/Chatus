import { useAppSelector } from "./store/hooks";
import "./App.css";

import { Chat } from "./Components/Chat";
import { Users } from "./Components/Users";
function App() {
  const { checkAuth } = useAppSelector((state) => state.user);
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
