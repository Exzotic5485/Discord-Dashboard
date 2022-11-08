# User Static <Badge type="info" text="OPTIONAL" />

If you want the Dashboard to host files for you (e.g. images, text files, etc.), simply set a folder that will be the file folder and the endpoint that will be used.

<Badge type="danger" text="NOTE: Static files within folder are accessible for everyone" />

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setStatic({
        url: '/cdn',
        path: path.join(__dirname, './cdn'),
    })
    ...
```

## Accessing sample

![User Static Sample](/images/dbd_static_sample.png)

![User Static Result](/images/dbd_static_result.png)
