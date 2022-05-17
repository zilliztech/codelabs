import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import translation files
import common from "./en/common.json";

export const resources = {
  en: {
    common,
  },
};

export const defaultNS = "common";

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["common"],
  keySeparator: ".",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
