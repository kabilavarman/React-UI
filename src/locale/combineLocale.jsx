import {avaliableLanguages} from './index';
export const combineLocale = (locales) => {
    /**
    * Gets the programmatic name of the entire locale, with the language, 
    *   country and variant separated by underbars. The Language is always lower case, 
    *   and country is always upper case. If the language is missing, 
    *   the string will begin with an underscore character. 
    *   If both the language and country fields are missing, 
    *   this function will return the empty string, 
    *   even if the variant field is filled in (you cannot have a locale with just a variant-- 
    *   the variant must accompany a valid language or country code). Examples: "en"
    *
    */
    const combineAll = {};
    for (var key in avaliableLanguages) {
        combineAll[key] = {};
    }

    Object.keys(locales).forEach((locale) => {
        Object.keys(locales[locale]).forEach((lang) => {
            if(combineAll.hasOwnProperty(lang)){
                combineAll[lang][locale] = locales[locale][lang];
            }
        });
    });

    return combineAll;
}