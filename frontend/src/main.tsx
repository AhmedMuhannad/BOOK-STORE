import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { store } from './App/store.tsx'
import { Provider } from 'react-redux'
import { AuthProvider } from "./context/AutrhProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
        <App />
      </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
