import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/Login/Login.jsx";
import { appPaths } from "./routes.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.notFound} element={<NotFound />} />
        <Route path={appPaths.login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
