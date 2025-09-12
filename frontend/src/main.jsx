import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import store from "./store"; // <-- ton store global
import App from "./App";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
