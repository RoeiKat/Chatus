import React from "react";
import ReactDOM from "react-dom/client";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import { store } from "./store/store";

import App from "./App";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
