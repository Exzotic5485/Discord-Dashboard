# Starting the Dashboard

It's time to get started! Launch the Dashboard using a simple function!

<Badge type="danger" text="NOTE: This should be the last function of the Dashboard used; any changes and functions used after the start may not be used" />

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .start()
    .then((instance) => {
        console.log(
            `Dashboard started on ${instance.port} port with ${
                instance.theme.name
            } (codename: ${instance.theme.codename}) theme in ${
                instance.dev ? 'development' : 'production'
            } mode!`
        )
    })
    .catch((err) => {
        console.error(err)
    })
```

