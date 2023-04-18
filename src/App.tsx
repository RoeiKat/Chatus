import "./App.css";
import { Chat } from "./Components/Chat";

function App() {
  return (
    <div
      className="d-flex align-items-center justify-content-center border border-light"
      style={{ height: "100vh" }}
    >
      <Chat />
    </div>
  );
}

export default App;
