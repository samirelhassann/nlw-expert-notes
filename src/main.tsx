import React from "react";

import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./app";
import "./index.css";
import NoteContextProvider from "./contexts/notes-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NoteContextProvider>
      <App />
      <Toaster richColors position="top-right" />
    </NoteContextProvider>
  </React.StrictMode>,
);
