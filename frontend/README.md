## FAQS

### Why do I see import paths that start with `$`? For example `'$lib/theme'`.

These are what's called path aliases. It helps clean up the import statement, turning something like `'../../../../lib/theme'` into `'$lib/theme'`.

You can find the aliases inside the `jsconfig.json`, but that **only** provides the autocomplete for our editor. For webpack to know what these aliases map to, we put the names inside the `resolve.alias` property.

For example:

```js
const path = require("path");

module.exports = {
  // Rest of config here
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
};
```
