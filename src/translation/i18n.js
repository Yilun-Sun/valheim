import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 
import { TRANSLATIONS_ZH } from "./langs/zh";
import { TRANSLATIONS_EN } from "./langs/en";
 
i18n
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     zh: {
       translation: TRANSLATIONS_ZH
     }
   }
 });
 
i18n.changeLanguage("en");