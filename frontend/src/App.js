import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/Login/Login.jsx";
import ChatPage from "./components/Chat/ChatPage.jsx";
import { appPaths } from "./routes.js";
import { useAuth } from "./hooks";
import "bootstrap/dist/css/bootstrap.min.css";

const DefaultRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={appPaths.login} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.notFound} element={<NotFound />} />
        <Route path={appPaths.login} element={<Login />} />
        <Route
          path={appPaths.chat}
          element={
            <DefaultRoute>
              <ChatPage />
            </DefaultRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
