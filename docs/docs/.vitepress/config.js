export default {
    title: 'Discord-Dashboard v3 Documentation',
    description: 'Discord-Dashboard project documentation.',
    themeConfig: {
        siteTitle: 'Discord-Dashboard v3',
        nav: [
            { text: 'Guide', link: '/guide' },
            { text: 'Configs', link: '/configs' },
            { text: 'Changelog', link: 'https://github.com/...' },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction', link: '/docs/' },
                    { text: 'Requirements', link: '/docs/requirements' },
                    {
                        text: 'Creating Project Instance',
                        link: '/docs/creating-project-instance',
                    },
                    { text: 'Installation', link: '/docs/installation' },
                ],
            },
            {
                text: 'Documentation',
                items: [
                    {
                        text: 'Initiation',
                        link: '/docs/module/initiation',
                    },
                    {
                        text: 'Development Mode',
                        link: '/docs/module/development-mode',
                    },
                    {
                        text: 'Theme and Engine',
                        link: '/docs/module/theme-and-engine',
                    },
                    {
                        text: 'Register the Project',
                        link: '/docs/module/register-the-project',
                    },
                    {
                        text: 'Discord.js Client',
                        link: '/docs/module/discord-js-client',
                    },
                    {
                        text: 'Client Credentials',
                        link: '/docs/module/client-credentials',
                    },
                    {
                        text: 'Redirect URI',
                        link: '/docs/module/redirect-uri',
                    },
                    {
                        text: 'Options Folder',
                        link: '/docs/module/options-folder',
                    },
                ],
            },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022 - Assistants Center',
        },
        search: true,
        searchMaxSuggestions: 10,
    },
}
