import React from "react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import App from "./App.js";
import resources from "./locales";
import AuthProvider from "./context/AuthProvider.jsx";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({ resources, fallbackLng: "ru" });
  return (
    <StoreProvider store={store}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default init;
