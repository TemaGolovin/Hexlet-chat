import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/Signup/SignUp';
import ChatPage from './components/Chat/ChatPage.jsx';
import { appPaths } from './routes.js';
import { useAuth } from './hooks';
import Header from './components/Header/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const DefaultRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={appPaths.login} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <ToastContainer />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path={appPaths.login} element={<Login />} />
        <Route path={appPaths.signUp} element={<SignUp />} />
        <Route
          path={appPaths.chat}
          element={(
            <DefaultRoute>
              <ChatPage />
            </DefaultRoute>
            )}
        />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
