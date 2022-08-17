const test = require('ava')

const exec = require('node-async-exec')
const path = require('path')

require('dotenv').config({path: path.join(__dirname, './.env')})

const axios = require('axios').create({

})

axios.get('/')

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [ Intents.FLAGS.GUILDS ] })

const init_tests = async () => {
    await test('build', async build_test => {
        try {
            await exec({ cmd: `tsc` })
            build_test.pass()
        } catch (err) {
            build_test.log(err)
            build_test.fail()
        }
    })

    const DefaultTheme = require('../Themes/NextSample')
    const Theme = new DefaultTheme.Provider()
        .addCustomPage({
            url: '/test',
            components: [],
            icon: 'home',
            name: 'Test',
            section: 'LoL',
        })

    const { Dashboard, FormTypes, Engines, DiscordPermissions } = require('../dist')
    
    new Dashboard(Engines.NEXT)
        .setDev(true)
        .registerProject({
            accountToken: process.env.ASSISTANTS_SERVICES_ACCOUNT_TOKEN,
            projectId: process.env.DISCORD_DASHBOARD_PROJECT_ID
        })
        .setRequiredPermissions([DiscordPermissions.ADMINISTRATOR])
        .setTheme(Theme)
        .setOptionsFolder(path.join(__dirname, './DiscordDashboardCategories'))
        .setPort(process.env.PORT)
        .setDiscordClient(client)
        .setClientCredentials({
            id: process.env.CLIENT_ID,
            secret: process.env.CLIENT_SECRET,
        })
        .setStatic({
            url: '/cdn',
            path: path.join(__dirname, './static')
        })
        .setSession({
            secret: process.env.SESSION_SECRET,
            expires: 1000 * 60 * 60 * 24 * 7,
            saveUninitialized: false,
            store: (session) => {
                const FileStore = require('session-file-store')(session)
                return new FileStore({})
            }
        })
        .setAdministrators(['778685361014046780'])
        /*.setFastifyUtilities([
            [helmet, { contentSecurityPolicy: false, global: true }],
        ])*/
        .start()
        .then((instance) => {
            console.log(
                `Dashboard started on ${instance.port} port with ${instance.theme.name} ` +
                `(codename: ${instance.theme.codename}) theme in ${instance.dev ? 'development' : 'production'} mode.`
            )
        })
        .catch((err) => {
            console.error(err)
        })


        await test('loading', async t => {
            t.timeout(70000)
            function sleep(ms) {
                return new Promise((resolve) => {
                  setTimeout(resolve, ms);
                });
              }

            await sleep(60000)
            t.pass()
        })
}

init_tests()