# Theme and Engine <Badge type="warning" text="REQUIRED" />

Discord-Dashboard is a module that allows you a huge amount of customisation! Therefore, we allow for various rendering engines and external themes.

To get started with Discord-Dashboard, you now need to select a Theme of your choice. Don't worry, any theme can always be changed and the Dashboard core will always work the same!

Refer to: [Available Themes](#)

<hr/>

Once you know which Theme and Engine to use, define the Engine and add the Theme to the Dashboard class:

```js
const { Dashboard, Engines } = require('discord-dashboard')

const DefaultTheme = require('defaultthemetobeupdated')
const Theme = new DefaultTheme.Provider()

new Dashboard(Engines.NEXT)
    ...
    .setTheme(Theme)
    ...
```

<Badge type="tip" text="RELEVANT" /> Engine must match the Theme's engine (NEXT/EJS).
