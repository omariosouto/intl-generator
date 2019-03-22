const intlgeneratorSetup = require('../src/intlgeneratorSetup');

describe('# intlgeneratorSetup', () => {
  const brazilianLanguageCode = 'pt-BR';
  const englishLanguageCode = 'en-US';
  const brazilianSetup = intlgeneratorSetup(brazilianLanguageCode);
  const englishSetup = intlgeneratorSetup(englishLanguageCode);

  describe('## defaultLanguage', () => {
    it('defaultLanguage should not be empty', () => {
      expect(() => intlgeneratorSetup()).toThrow();
    });
    it(`${brazilianLanguageCode} should be the default language`, () => {
      expect(brazilianSetup.defaultLanguage).toEqual(brazilianLanguageCode);
    });
    it(`${englishLanguageCode} should be the default language`, () => {
      expect(englishSetup.defaultLanguage).toEqual(englishLanguageCode);
    });
  });

  describe('## translationsByLanguageIdAsJSON()', () => {
    it('should translationsByLanguageIdAsJSON() return a JSON', () => {
      const json = JSON.parse(brazilianSetup.translationsByLanguageIdAsJSON());

      expect(typeof brazilianSetup.translationsByLanguageIdAsJSON()).toBe('string');
      expect(json).toHaveProperty(brazilianLanguageCode);
    });
  });

  describe('## addTranslations()', () => {
    const defaultLanguage = brazilianLanguageCode;
    const newBrazilianSetup = intlgeneratorSetup(defaultLanguage);

    it('Should add one or more translations where key is based on phrase of default language', () => {
      newBrazilianSetup.addTranslations([
        {
          [defaultLanguage]: 'Olá mundo',
          'en-US': 'Hello World {name}',
        },
        {
          'en-US': 'Hello World {name}',
          [defaultLanguage]: 'Olá mundo {name}',
        },
      ]);

      const translationsObject = JSON.parse(newBrazilianSetup.translationsByLanguageIdAsJSON());

      const firstTranslationId = 'Olá mundo';
      expect(translationsObject[defaultLanguage][firstTranslationId]).toEqual(firstTranslationId);
      expect(translationsObject['en-US'][firstTranslationId]).toEqual('Hello World {name}');

      const secondTranslationId = 'Olá mundo {name}';
      expect(translationsObject[defaultLanguage][secondTranslationId]).toEqual(secondTranslationId);
      expect(translationsObject['en-US'][secondTranslationId]).toEqual('Hello World {name}');
    });

    it('Should add one or more translations by key', () => {
      newBrazilianSetup.addTranslations([
        {
          key: 'default.welcome',
          [defaultLanguage]: 'Bem vindo',
          'en-US': 'Welcome',
        },
        {
          key: 'default.welcomewithname',
          'en-US': 'Welcome {name}',
          [defaultLanguage]: 'Bem vindo {name}',
        },
      ]);

      const translationsObject = JSON.parse(newBrazilianSetup.translationsByLanguageIdAsJSON());

      const firstTranslationId = 'default.welcome';
      expect(translationsObject[defaultLanguage][firstTranslationId]).toEqual('Bem vindo');
      expect(translationsObject['en-US'][firstTranslationId]).toEqual('Welcome');

      const secondTranslationId = 'default.welcomewithname';
      expect(translationsObject[defaultLanguage][secondTranslationId]).toEqual('Bem vindo {name}');
      expect(translationsObject['en-US'][secondTranslationId]).toEqual('Welcome {name}');
    });

    it('Should get an error when try to add an existing translationKey', () => {
      expect(() => {
        newBrazilianSetup.addTranslations([
          {
            key: 'default.welcome',
            [defaultLanguage]: 'Bem vindo',
            'en-US': 'Welcome',
          },
        ]);
      }).toThrow();
    });
  });
});
