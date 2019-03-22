function extractTranslationKeyFrom(translation) {
  // eslint-disable-next-line no-param-reassign
  const { key } = translation;
  // eslint-disable-next-line no-param-reassign
  delete translation.key;
  return key;
}

function getLanguageIdsFrom(translation) {
  return Object.keys(translation);
}

function getDefaultTranslationIdFrom(translation, defaultLanguage) {
  return translation[defaultLanguage];
}

module.exports = {
  extractTranslationKeyFrom,
  getLanguageIdsFrom,
  getDefaultTranslationIdFrom,
};
