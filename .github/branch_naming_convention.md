<h1>Naming Conventions</h1>

<h3>Syntax</h3>

  - `<branch-type>/<author>/<branch-name>`

<h3>Start with a branch type</h3>

  - bug
  - fix
  - hotfix
  - feature

<h3>Use Hyphen as separators</h3>
    
   Example 1 (Without any separator):
    
   - `feature/gio/settingspage`
    
   Example 2 (With a separator):
    
   - `feature/gio/settings-page`

<h3>Avoid long descriptive names for branches</h3>

   - The branch name should be precise and informative
   - Example (long descriptive names):
       - `feature/gio/login-module-which-will-be-used-in-the-internal-website`
       - `feature/gio/login-module-which-will-be-used-in-the-public-website`
   - Example (precise and informative):
       - `feature/gio/internal-login-module`
       - `feature/gio/external-login-module`
