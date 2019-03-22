# intlgenerator

> npm install intlgenerator

This library is very good working with: https://github.com/yahoo/react-intl/
If you wan't to use it to generate your JSON file with another i18n library, you could try or just request/send a PR :) 

## How to use?

1 - First, you must to have an **React Application** and install https://github.com/yahoo/react-intl

2 - You must setup your `react-intl` following the documentation.

3 - Inside your `./src` folder, create an `_i18n` folder.


4 - Now, create a `setupi18n.js` file in any folder of your preference with an structure like this:

> **!!!WARNING!!!** this file won't be imported in your react application!!! 

```js
const { intlgeneratorSetup } = require('intlgenerator')

const { addTranslations, exportLanguagesJSON } = intlgeneratorSetup('en-US')

// - Obrigatório um idioma padrão
addTranslations([
    {
        'key': 'default.yourmessagegoeshere',
        'pt-BR': 'Sua mensagem vai aqui {name}',
        'en-US': 'Your message goes here {name}',
    },
    {
        'key': 'default.welcome',
        'pt-BR': 'Bem vindo',
        'en-US': 'Welcome',
    },
    {
        'pt-BR': 'Olá mundo',
        'en-US': 'Hello World',
    }
])


exportLanguagesJSON()
```

> That file will generate an JSON file inside `./src/_i18n/` with this structure: 

####### ./src/_i18n/translations.json

```js
{
    "en-US": {
        "default.yourmessagegoeshere": "Your message goes here {name}",
        "default.welcome": "Welcome",
        "Hello World": "Hello World"
    },
    "pt-BR": {
        "default.yourmessagegoeshere": "Sua mensagem vai aqui {name}",
        "default.welcome": "Bem vindo",
        "Hello World": "Olá mundo"
    }
}
```

That's exactly the format that `react-intl` want to translate your project.

```js
<FormattedMessage id="Hello World"/> // Hello World / Olá Mundo

<FormattedMessage id="default.yourmessagegoeshere" values={{name: <b>{name}</b>}}/> // Your message goes here {name} / Sua mensagem vai aqui {name}

```

5 - To generate that JSON whenever you update the `setupi18n.js` with the `react-scripts start` command running:

- Install these two libraries `npm install --save-dev concurrently nodemon`;
- Add these two scripts to your `package.json`:

```json
  "start": "concurrently \"react-scripts start\" \"npm run i18n:build\"",
  "i18n:build": "nodemon ./setupi18n.js",
```

6 - After that, update your `react-intl` provider to import that generated JSON:

####### ./src/_i18n/IntlProviderConfigured.js
```js
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'
import translations from './translations.json'

addLocaleData([...en, ...pt])


let locale = 'pt-BR' // Build your own strategy to get the locale
// locale = 'en-US'

console.log('translations[locale]', translations[locale])

export default ({children}) => (
    <IntlProvider locale={locale} messages={translations[locale]}>
        {children}
    </IntlProvider>
)
```
