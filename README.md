# salesforce-key-prefixes

[![build status](https://badgen.net/travis/vladimyr/salesforce-key-prefixes/master)](https://travis-ci.com/vladimyr/salesforce-key-prefixes)
[![npm package version](https://badgen.net/npm/v/salesforce-key-prefixes)](https://npm.im/salesforce-key-prefixes)
[![github license](https://badgen.net/github/license/vladimyr/salesforce-key-prefixes)](https://github.com/vladimyr/salesforce-key-prefixes/blob/master/LICENSE)
[![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

>List of Salesforce object key prefixes

Data comes from the excellent [Daniel Ballinger](https://github.com/FishOfPrey)'s [gist](https://gist.github.com/FishOfPrey/05f7a742757fce071a09) (content of http://fishofprey.com/2011/09/obscure-salesforce-object-key-prefixes.html).

## Install

    $ npm install salesforce-key-prefixes

## Usage

```js
const keyPrefixes = require('salesforce-key-prefixes');

console.log(keyPrefixes);
//=> {'100': 'UserLicense', '101': 'ExternalString', '102': 'FeatureLicense', …}
```
