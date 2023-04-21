import { useAppSelector } from "./store/hooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

import { Chat } from "./Components/Chat";
import { Users } from "./Components/Users";
function App() {
  const { checkAuth } = useAppSelector((state) => state.user);

  // const { initalLoad } = useAppSelector((state) => state.ui);

  useLocalStorage();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {!checkAuth ? <Users /> : <Chat />}
    </div>
  );
}

export default App;
