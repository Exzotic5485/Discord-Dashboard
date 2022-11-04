import DiscordOauth2 from 'discord-oauth2'
const oauth = new DiscordOauth2()

import AuthorizeUser from '../utils/AuthorizeUser'

export const router: (props: any) => void = (props: {
    requiredPermissions: [string, number][]
    fastify: any
    discordClient: any
    categories: any
}) => {
    props.fastify.register(
        (instance: any, opts: any, next: any) => {
            instance.get('/callback', async (request: any, reply: any) => {
                if (request.query?.guild_id) {
                    if (
                        !props.discordClient.guilds.cache.get(
                            request.query.guild_id
                        )
                    )
                        await props.discordClient.guilds.fetch(
                            request.query.guild_id
                        )
                    if (
                        !props.discordClient.guilds.cache
                            .get(request.query.guild_id)
                            .members.cache.get(request.session.user?.id)
                    )
                        await props.discordClient.guilds.cache
                            .get(request.query.guild_id)
                            .members.fetch(request.session.user?.id)
                    return reply.redirect(`/guild/${request.query.guild_id}`)
                }

                const token =
                    await props.fastify.discordOAuth2.getAccessTokenFromAuthorizationCodeFlow(
                        request
                    )
                await AuthorizeUser({ oauth, props, token, request, reply })
            })

            next()
        },
        { prefix: '/api/auth' }
    )
}
