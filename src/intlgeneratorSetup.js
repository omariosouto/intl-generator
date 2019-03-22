const fs = require('fs');
const path = require('path');
const { extractTranslationKeyFrom, getDefaultTranslationIdFrom, getLanguageIdsFrom } = require('./translationOperations');

module.exports = (defaultLanguage) => {
  if (!defaultLanguage) {
    throw new Error('You must to provide an [defaultLanguage]!');
  }

  // eslint-disable-next-line prefer-const
  let translationsByLanguageId = {
    [defaultLanguage]: {},
  };

  function addTranslations(translations) {
    translations.forEach((translation) => {
      const translationKey = extractTranslationKeyFrom(translation);
      const defaultTranslationId = getDefaultTranslationIdFrom(translation, defaultLanguage);
      const languageIds = getLanguageIdsFrom(translation);

      languageIds.forEach((languageId) => {
        translationsByLanguageId[languageId] = translationsByLanguageId[languageId] || {};
        const translationId = translationKey || defaultTranslationId;
        const translationKeyAlreadyExists = translationsByLanguageId[languageId][translationId];

        if (translationKeyAlreadyExists) throw new Error('This key is already in use, please use another');

        translationsByLanguageId[languageId] = {
          ...translationsByLanguageId[languageId],
          [translationId]: translation[languageId],
        };
      });
    });
  }

  function translationsByLanguageIdAsJSON() {
    return JSON.stringify(translationsByLanguageId);
  }

  function exportLanguagesJSON() {
    const baseDir = path.resolve('src', '_i18n');
    const jsonData = translationsByLanguageIdAsJSON();
    fs.writeFile(`${baseDir}/translations.json`, jsonData, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('The translations.json file has been updated!');
    });
  }

  return {
    defaultLanguage,
    translationsByLanguageIdAsJSON,
    addTranslations,
    exportLanguagesJSON,
  };
};
