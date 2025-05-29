import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import "./index.css";
import App from "./App.jsx";
import "./bootstrap.min.css";
import ContextShare from "./Context/ContextShare.jsx";

createRoot(document.getElementById("root")).render(
  // to implement context api, we have to enclose App component inside ContextShare
  <ContextShare>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextShare>

);
