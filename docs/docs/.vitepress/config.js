export default {
    title: 'Discord-Dashboard Docs',
    description: 'Discord-Dashboard project documentation.',
    themeConfig: {
        siteTitle: 'Discord Dashboard',
        nav: [
            { text: 'Guide', link: '/guide' },
            { text: 'Configs', link: '/configs' },
            { text: 'Changelog', link: 'https://github.com/...' },
        ],
        sidebar: {
            '/v3': [
                {
                    text: 'Discord-Dashboard v3 Documentation',
                    items: [],
                },
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Introduction', link: '/v3/' },
                        { text: 'Requirements', link: '/v3/requirements' },
                        {
                            text: 'Creating Project Instance',
                            link: '/v3/creating-project-instance',
                        },
                        { text: 'Installation', link: '/v3/installation' },
                    ],
                },
                {
                    text: 'Configuration',
                    items: [
                        {
                            text: 'Initiation',
                            link: '/v3/configuration/initiation',
                        },
                        {
                            text: 'Development Mode',
                            link: '/v3/configuration/development-mode',
                        },
                        {
                            text: 'Theme and Engine',
                            link: '/v3/configuration/theme-and-engine',
                        },
                        {
                            text: 'Register the Project',
                            link: '/v3/configuration/register-the-project',
                        },
                        {
                            text: 'Discord.js Client',
                            link: '/v3/configuration/discord-js-client',
                        },
                        {
                            text: 'Client Credentials',
                            link: '/v3/configuration/client-credentials',
                        },
                        {
                            text: 'Redirect URI',
                            link: '/v3/configuration/redirect-uri',
                        },
                        {
                            text: 'Options Folder',
                            link: '/v3/configuration/options-folder',
                        },
                        {
                            text: 'Required Permissions',
                            link: '/v3/configuration/required-permissions',
                        },
                        {
                            text: 'User Static',
                            link: '/v3/configuration/user-static',
                        },
                        {
                            text: 'Session Settings',
                            link: '/v3/configuration/session-settings',
                        },
                        {
                            text: 'Administrators',
                            link: '/v3/configuration/administrators',
                        },
                        {
                            text: 'Fastify Utilities',
                            link: '/v3/configuration/fastify-utilities',
                        },
                        {
                            text: 'Port',
                            link: '/v3/configuration/port',
                        },
                        {
                            text: 'Starting the Dashboard',
                            link: '/v3/configuration/starting-the-dashboard',
                        },
                    ],
                },
                {
                    text: 'Form Types',
                    items: [],
                },
                {
                    text: 'Premium',
                    items: [],
                },
            ],
            '/themes/v3/kardex': [
                {
                    text: 'Discord-Dashboard v3 Kardex Theme Documentation',
                    items: [],
                },
            ],
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022 - Assistants Center',
        },
    },
}
