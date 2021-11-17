## Project struture

```bash
src
├── components  # shared components used across the entire application
│
├── lib         # re-exporting different libraries preconfigured for the application
│
├── modules     # feature based modules
│
├── types       # base types used across the app
│
├── utils       # shared utility functions
```

For the modules

```bash
src/modules/awesome-feature
│
├── components  # components scoped to a specific feature
│
├── hooks       # components scoped to a specific feature
│
├── routes      # route components for a specific feature pages
│
├── stores      # state stores for a specific feature
│
├── utils       # utility functions for a specific feature
│
├── index.js    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

### Why a feature/module based structure?

In order to keep the codebase maintainable, we keep most of our code inside the `modules` folder, which should contain different feature-based things. Every `modules` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

Here's a rule of thumb (Of course with some exceptions): **If we delete a certain feature/module, the rest of the app should not be affected.**

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
