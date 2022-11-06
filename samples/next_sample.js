const path = require('path')

const dotenv = require('dotenv').config({
    path: path.join(__dirname, './.env'),
})

const { Client, GatewayIntentBits, Partials } = require('discord.js')
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
})

client.login(process.env.BOT_TOKEN)

const { Dashboard, Engines, DiscordPermissions } = require('../dist/index')

const DefaultTheme = require('../Themes/NextSample')
const Theme = new DefaultTheme.Provider().addCustomPage({
    url: '/privacy-policy',
    icon: 'InfoSquare',
    name: 'Privacy Policy',
    section: 'Legal',
})

new Dashboard(Engines.NEXT)
    .setDev(true)
    .setTheme(Theme)
    .registerProject({
        accountToken: process.env.ASSISTANTS_SERVICES_ACCOUNT_TOKEN,
        projectId: process.env.DISCORD_DASHBOARD_PROJECT_ID,
    })
    .setDiscordClient(client)
    .setClientCredentials({
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    })
    .setRedirectURI('http://localhost:3000/api/auth/callback')
    .setOptionsFolder(path.join(__dirname, './DiscordDashboardCategories'))
    .setPort(process.env.PORT)
    .setRequiredPermissions([
        DiscordPermissions.ADMINISTRATOR,
        DiscordPermissions.MANAGE_NICKNAMES,
    ])
    .setStatic({
        url: '/cdn',
        path: path.join(__dirname, './static'),
    })
    .setSession({
        secret: process.env.SESSION_SECRET,
        expires: 1000 * 60 * 60 * 24 * 7,
        saveUninitialized: false,
        store: (session) => {
            const FileStore = require('session-file-store')(session)
            return new FileStore({})
        },
    })
    .setAdministrators(['778685361014046780'])
    .setFastifyUtilities([
        /* [helmet, { contentSecurityPolicy: false, global: true }],*/
    ])
    .start()
    .then((instance) => {
        console.log(
            `Dashboard started on ${instance.port} port with ${instance.theme.name} ` +
                `(codename: ${instance.theme.codename}) theme in ${
                    instance.dev ? 'development' : 'production'
                } mode.`
        )
    })
    .catch((err) => {
        console.error(err)
    })
