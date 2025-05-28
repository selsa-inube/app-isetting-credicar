import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "@locales/en/translation";
import { es } from "@locales/es/translation";
import { enviroment } from "@config/environment";

let initialized = false;

if (!initialized) {
  i18next.use(initReactI18next).init({
    lng: enviroment.VITE_LANGUAGE,
    fallbackLng: "es",
    debug: true,
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });
  initialized = true;
}

export { i18next };
