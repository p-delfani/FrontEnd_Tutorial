
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fa from "./fa";
import en from "./en";

i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
    en: { translation: en },
  },

  lng: localStorage.getItem("smart-notes-language") || "fa",
  fallbackLng: "fa",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
