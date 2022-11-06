/**
 * @file index.ts
 * @author Assistants Center
 * @license CC BY-NC-SA 4.0
 */

import {
    Client,
    ProjectInfo,
    SessionSettings,
    SSLOptions,
    UserStatic,
} from './types/types'
import PermissionsEnum from './utils/DiscordPermissions'

import path from 'path'
import fs from 'fs'
import axios from 'axios'
import colors from 'colors'

import { fastify as fastifyModule } from 'fastify'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import fastifyOauth2 from '@fastify/oauth2'

import { ErrorThrower } from './utils/ErrorThrower'
import { AcsClient } from './utils/AcsClient'

import * as ApiRouter from './api/router'

function validateUrl(value: string) {
    return /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/i.test(
        value
    )
}

export class Dashboard {
    public engine: EnginesEnum

    constructor(engine: EnginesEnum) {
        if (!engine)
            ErrorThrower(
                'Engine is required. Pass it as the first and only class constructor parameter (supported engines are accessible from DBD.Engines).'
            )
        if (engine != EnginesEnum.EJS && engine != EnginesEnum.NEXT)
            ErrorThrower(
                `The engine must be either "ejs" or "next". Received "${engine}" which is not a valid supported engine.`
            )
        this.engine = engine
    }
    private fastify: any

    public redirect_uri: string = 'http://localhost/api/auth/callback'

    public port: number | undefined
    public dev: boolean = false
    private theme: any

    public botInvite: {
        permissions: number | string
        scopes: string[]
    } = {
        permissions: 8,
        scopes: ['bot', 'applications.commands'],
    }

    private project: ProjectInfo = {
        accountToken: '',
        projectId: '',
    }

    private sessionStore: any
    private sessionSecret: string | undefined
    private sessionExpires: number | undefined
    private saveUninitialized: boolean | undefined

    public administrators: string[] | undefined
    public fastifyUtilities: any[] = []
    private dbdPlugins: any[] = []

    public categories: any[] = []

    private client: Client = {
        id: '',
        secret: '',
    }

    public requiredPermissions: PermissionsEnum[] = [
        PermissionsEnum.ADMINISTRATOR,
    ]

    private discordClient: any

    public userStatic: UserStatic | undefined

    private SSL: SSLOptions | undefined

    public version: string = require('../package.json').version

    private AcsClient: any
    private ACS_Identity: any
    private LicenseStatus: any

    public setDev(dev: boolean) {
        this.dev = dev
        return this
    }

    public setRequiredPermissions(permissions: PermissionsEnum[]) {
        this.requiredPermissions = permissions
        return this
    }

    public setClientCredentials(clientData: Client) {
        this.client = clientData
        return this
    }

    public setRedirectURI(redirect_uri: string) {
        if (!validateUrl(redirect_uri))
            return ErrorThrower('Invalid redirect URI')
        if (!redirect_uri.endsWith('/api/auth/callback'))
            return ErrorThrower(
                'Redirect URI must end with "/api/auth/callback".'
            )
        this.redirect_uri = redirect_uri
        return this
    }

    public registerProject(projectInfo: ProjectInfo) {
        this.project = projectInfo
        return this
    }

    public setTheme(theme: any) {
        if (theme.engine != this.engine)
            ErrorThrower(
                `${theme.name} doesn't support "${this.engine}" engine. Please use "${theme.engine}" engine.`
            )
        this.theme = theme
        return this
    }

    public setPort(port: number) {
        this.port = port
        return this
    }

    public setSession(sessionSettings: SessionSettings) {
        sessionSettings = Object.assign(
            {
                store: (fastifySession: any) => fastifySession.memory,
                secret: 'ggt9j5093g5g595t65h0gi6gih5gih956054544gtg4t4gtrgt4gt6g',
                expires: 3600,
                saveUninitialized: true,
            },
            sessionSettings
        )

        this.sessionStore = sessionSettings.store(fastifySession)
        this.sessionSecret = sessionSettings.secret
        this.sessionExpires = sessionSettings.expires
        this.saveUninitialized = sessionSettings.saveUninitialized
        return this
    }

    public setStatic(staticConfig: UserStatic) {
        staticConfig = Object.assign(
            {
                url: '/static',
                path: './static',
            },
            staticConfig
        )

        this.userStatic = staticConfig
        return this
    }

    public setDiscordClient(client: any) {
        this.discordClient = client

        return this
    }

    public setSSL(sslInfo: SSLOptions) {
        this.SSL = sslInfo
        return this
    }

    public setOptionsFolder(path_src: string) {
        const categories = fs.readdirSync(path_src)
        for (const category of categories) {
            let categoryId = category
            while (categoryId.includes(' '))
                categoryId = categoryId.replace(' ', '_')

            const categoryData = {
                id: categoryId.toLowerCase(),
                name: category,
            }

            const categoryOptions = this.resolveOptions(
                path.join(path_src, category)
            )

            let categoryInfo
            if (
                fs.existsSync(
                    path.join(path_src, category, './__category_info.js')
                )
            ) {
                categoryInfo = require(path.join(
                    path_src,
                    category,
                    './__category_info.js'
                ))
                if (categoryInfo.id) {
                    categoryId = categoryInfo.id
                    while (categoryId.includes(' '))
                        categoryId = categoryId.replace(' ', '_')
                    categoryData.id = categoryId
                }
            }

            this.categories.push({
                id: categoryData.id,
                showEnableDisableSwitch:
                    categoryInfo?.showEnableDisableSwitch == null
                        ? false
                        : categoryInfo?.showEnableDisableSwitch,
                usePromiseResolveSystem:
                    categoryInfo?.usePromiseResolveSystem == null
                        ? true
                        : categoryInfo.usePromiseResolveSystem,
                isEnabled:
                    categoryInfo.isEnabled ??
                    function yes() {
                        return true
                    },
                isDisabledGlobally:
                    categoryInfo.isDisabledGlobally ??
                    function not() {
                        return false
                    },
                name: categoryData.name,
                options: categoryOptions,
            })
        }
        this.categories = this.categories.sort((a, b) => (a.id > b.id ? 1 : -1))
        this.verifyOptions()
        return this
    }

    public setAdministrators(administrators: string[]) {
        this.administrators = administrators
        return this
    }

    public setFastifyUtilities(fastifyUtilities: any[] = []) {
        this.fastifyUtilities = fastifyUtilities
        return this
    }

    public addPlugin(plugin: any) {
        this.dbdPlugins.push(plugin)
        return this
    }

    public start = async () => {
        const res = await axios.get(
            'https://registry.npmjs.org/discord-dashboard/latest'
        )
        if (res.data?.version > this.version) {
            console.log(
                `[Discord Dashboard v${this.version}] There is a new version of Discord Dashboard available. Please update.`
            )
            const this_version = await axios.get(
                `https://registry.npmjs.org/discord-dashboard/${this.version}`
            )
            if (this_version?.data?.deprecated) {
                ErrorThrower(
                    `This version is deprecated. Please update the module.`
                )
            }
        }

        await this.discordClient.guilds.fetch()

        this.AcsClient = new AcsClient({
            account_access_token: this.project.accountToken,
            dbd_project_id: this.project.projectId,
        })
        this.ACS_Identity = await this.AcsClient.login()
        this.LicenseStatus = await this.AcsClient.collectLicenseStatus()

        colors.enable()
        console.log(
            this.LicenseStatus.type == 'premium'
                ? 'DISCORD-DASHBOARD PREMIUM ❤️'.rainbow
                : 'DISCORD-DASHBOARD FREE'
        )
        console.log(`Project ID: ${this.project.projectId}`)
        console.log('\n')
        console.log(this.LicenseStatus)
        if (this.LicenseStatus.type == 'premium') {
            console.log(
                `Date of next payment: ${new Date(
                    new Date(this.LicenseStatus.active_until).getTime() -
                        172800000
                )
                    .toISOString()
                    .substring(0, 10)}`.blue
            )
            console.log(
                `Valid until: ${new Date(this.LicenseStatus.active_until)
                    .toISOString()
                    .substring(0, 10)}`.blue
            )
            console.log('\n')
        }
        colors.disable()

        if (this.engine == EnginesEnum.NEXT) {
            if (this.dev) {
                console.log(
                    'Dashboard is in development mode. Please note that the dashboard will not send statistics to Assistants Services.'
                )
                console.log(
                    "Also, each change in the theme pages source code will not be reflected in the dashboard after turning off development mode. You'll have to run the build command inside theme folder to build the changes into production environment."
                )
            }
            this.fastify = fastifyModule({ logger: false })
            await this.prepareNext()
            this.registerFastifyEngine()
            this.registerFastifySession(this.fastify)
            for (const util of this.fastifyUtilities) {
                this.fastify.register(util[0], util[1] || {})
            }
            const FastifyApp = await this.prepareFastify()

            await FastifyApp.listen({
                port: this.port,
            })
            return this
        } else if (this.engine == EnginesEnum.EJS) {
            if (this.dev) {
                console.log(
                    'Running on EJS engine in development mode. Please note that the dashboard will not send statistics to Assistants Services.'
                )
            }
            this.fastify = fastifyModule({ logger: false })
            this.registerFastifyEngine()
            this.registerFastifySession(this.fastify)
            for (const util of this.fastifyUtilities) {
                this.fastify.register(util[0], util[1] || {})
            }
            const FastifyApp = await this.prepareFastify()

            await FastifyApp.listen({
                port: this.port,
            })
            return this
        } else {
            ErrorThrower(
                `Only "next" and "ejs" engines are officially supported (requested ${this.engine}).`
            )
        }
    }

    private resolveOptions(optionsPath: string) {
        const files = fs
            .readdirSync(optionsPath)
            .filter(
                (file) =>
                    !file.endsWith('.disabled.js') &&
                    file.endsWith('.js') &&
                    !file.startsWith('__')
            )
        const options = []
        for (const Option of files) {
            let option = require(path.join(optionsPath, `./${Option}`))
            if (!option.type)
                return ErrorThrower(
                    `Option ${Option} doesn't have a type defined.`
                )
            option.type = option.type.settings
            if (!option.name)
                return ErrorThrower(
                    `Option ${Option} doesn't have a name defined.`
                )
            let optionId = option.name
            while (optionId.includes(' ')) optionId = optionId.replace(' ', '_')
            optionId = optionId.toLowerCase()
            option.id = optionId

            // THEME OPTIONS
            //
            // resolveTypes:
            // getSettings - get the settings of the option after calling getSettings function
            // direct - get the settings of the option directly

            if (
                option.themeOptions &&
                option.themeOptions.resolveType == 'getSettings'
            ) {
                option.themeOptions = JSON.parse(
                    JSON.stringify(option.themeOptions.getSettings())
                )
            } else if (
                option.themeOptions &&
                option.themeOptions.resolveType == 'direct'
            ) {
                option.themeOptions = JSON.parse(
                    JSON.stringify(option.themeOptions)
                )
            }

            option = Object.assign(
                {
                    themeOptions: {},
                    shouldBeDisplayed: () => true,
                    permissionsValidate: () => null,
                    serverSideValidation: () => null,
                },
                option
            )
            options.push(option)
        }
        options.sort((a, b) => (a.id > b.id ? 1 : -1))
        return options
    }

    private verifyOptions() {
        const categories = this.categories
        let categoriesIds: string[] = []
        for (const category of categories) {
            if (categoriesIds.includes(category.id))
                ErrorThrower(`Category id ${category.id} is not unique.`)
            categoriesIds.push(category.id)
            const optionsIds: string[] = []
            for (const option of category.options) {
                if (!option.type)
                    ErrorThrower(`Option ${option.name} has no type.`)
                if (!option.name && option.type.name != 'CustomComponent')
                    ErrorThrower(
                        `An option in ${category.name} category with ${option.type.name} type has no name.`
                    )
                if (!option.id) ErrorThrower(`Option ${option.name} has no id.`)
                if (optionsIds.includes(option.id))
                    ErrorThrower(
                        `Option id ${option.id} of ${option.name} option is not unique.`
                    )
                if (option.type.name == 'CustomComponent') {
                    optionsIds.push(option.id)
                    continue
                }
                if (!option.get || typeof option.get !== 'function')
                    ErrorThrower(
                        `Option ${option.name} in ${category.name} category has no get function or it's type isn't a function.`
                    )
                if (!option.set || typeof option.set !== 'function')
                    ErrorThrower(
                        `Option ${option.name} in ${category.name} category has no set function or it's type isn't a function.`
                    )
                optionsIds.push(option.id)
            }
        }
    }

    private prepareNext = async () => {
        const { next_app, next_handler } = this.theme.initNext(this.dev)
        await next_app.prepare()
        return { next_app, next_handler }
    }

    private registerFastifyEngine() {
        if (this.engine == EnginesEnum.NEXT) {
            this.theme.registerFastifyNext(this.fastify, this.dev)
            return
        } else if (this.engine == EnginesEnum.EJS) {
            this.theme.registerFastifyEJS(this.fastify, this.dev)
            return
        } else {
            ErrorThrower(
                `Only "next" and "ejs" engines are officially supported (passed ${this.engine}).`
            )
        }
    }

    private registerFastifySession(fastify: any) {
        fastify.register(fastifyCookie)
        fastify.register(fastifySession, {
            secret:
                this.sessionSecret ||
                `${this.discordClient.id}+${this.client.id}`,
            cookie: { secure: Boolean(this.SSL?.httpRedirect) },
            expires: this.sessionExpires || 1000 * 60 * 60 * 24 * 7, // 7 days
            saveUninitialized: this.saveUninitialized,
            store: this.sessionStore,
        })
    }

    private registerFastifyStatic() {
        this.fastify.register(require('@fastify/static'), {
            root: path.join(__dirname, 'public'),
            prefix: '/module-content/',
        })

        this.fastify.register(require('@fastify/static'), {
            root: this.theme.public_path,
            prefix: '/theme-content/',
            decorateReply: false,
        })

        if (this.userStatic) {
            this.fastify.register(require('@fastify/static'), {
                root: this.userStatic.path,
                prefix: this.userStatic.url + '/',
                decorateReply: false,
            })
        }
    }

    private registerFastifyOAuth2() {
        this.fastify.register(fastifyOauth2, {
            name: 'discordOAuth2',
            scope: ['identify', 'guilds', 'guilds.join'],
            credentials: {
                client: {
                    id: this.client.id,
                    secret: this.client.secret,
                },
                auth: fastifyOauth2.DISCORD_CONFIGURATION,
            },
            startRedirectPath: '/auth',
            callbackUri: this.redirect_uri,
        })
    }

    private initFastifyRoutes() {
        ApiRouter.router(this)
    }

    private initFastifyThemePages = async () => {
        const ThemePages = await this.theme.getPages({ ...this })
        for (const page of ThemePages) {
            this.fastify.route({
                method: page.method.toUpperCase(),
                url: page.url,
                preHandler: async (request: any, reply: any) =>
                    await page.preHandler(request, reply),
                handler: async (request: any, reply: any) =>
                    await page.handler(request, reply),
            })
        }
    }

    private prepareFastify = async () => {
        const fastify = this.fastify

        this.registerFastifyStatic()
        this.registerFastifyOAuth2()
        this.initFastifyRoutes()
        await this.initFastifyThemePages()

        return fastify
    }
}

import { TextInput } from './formtypes/TextInput'
import { TextArea } from './formtypes/TextArea'
import { Select } from './formtypes/Select'
import { Checkbox } from './formtypes/Checkbox'
import { Switch } from './formtypes/Switch'

import { CustomComponent } from './formtypes/CustomComponent'

export const FormTypes = {
    TextInput,
    TextArea,
    Checkbox,
    Switch,
    Select,
    CustomComponent,
}

enum EnginesEnum {
    EJS = 'ejs',
    NEXT = 'next',
}

export const Engines = EnginesEnum

export const DiscordPermissions = PermissionsEnum
