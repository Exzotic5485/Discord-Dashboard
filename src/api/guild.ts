import { AllowOnlyAuthorized } from '../utils/AuthHandlers'

import { DisplayOption, CanChangeOption } from '../utils/OptionHandlers'
import { DisplayCategory } from '../utils/CategoryHandlers'
import {
    GetGuildByID,
    GetMemberFromGuildByID,
    VerifyUserPermissions,
} from '../utils/DiscordjsHandlers'
import PermissionsEnum from '../utils/DiscordPermissions'

export const router = ({
    requiredPermissions,
    fastify,
    discordClient,
    categories,
}: {
    requiredPermissions: [PermissionsEnum]
    fastify: any
    discordClient: any
    categories: any
}) => {
    fastify.register(
        (instance: any, opts: any, next: any) => {
            instance.get('/list', async (request: any, reply: any) => {
                AllowOnlyAuthorized({ request, reply })

                const guilds_c = await discordClient.guilds.cache

                const guilds = JSON.parse(
                    JSON.stringify(request.session.guilds || [])
                )
                    .map((guild: any) => {
                        const bot_on_guild = guilds_c.get(guild.id)
                        if (bot_on_guild) {
                            let member_on_guild =
                                bot_on_guild.members.cache.get(
                                    request.session.user.id
                                )
                            if (!member_on_guild) {
                                try {
                                    member_on_guild =
                                        bot_on_guild.members.fetch(
                                            request.session.user.id
                                        )
                                } catch {}
                            }
                            guild.memberOnGuild = !!member_on_guild
                        } else {
                            guild.memberOnGuild = true
                        }

                        guild.botOnGuild = !!bot_on_guild

                        guild.permissions = BigInt(guild.permissions)

                        for (const permission_required of requiredPermissions) {
                            if (
                                (guild.permissions & permission_required) !=
                                permission_required
                            ) {
                                return null
                            }
                        }

                        delete guild.permissions

                        return guild
                    })
                    .filter((g: any) => g != null && g.memberOnGuild == true)

                if (!guilds)
                    return {
                        error: true,
                        message: 'No guilds',
                    }

                return {
                    error: false,
                    guilds,
                }
            })

            instance.get(
                '/:guild_id/settings',
                async (request: any, reply: any) => {
                    AllowOnlyAuthorized({ request, reply })
                    const guild = await GetGuildByID({
                        guild_id: request.params.guild_id,
                        client: discordClient,
                    })
                    const member = await GetMemberFromGuildByID({
                        guild,
                        member_id: request.session.user.id,
                    })

                    const permissionsValidate = await VerifyUserPermissions({
                        member,
                        permissions: requiredPermissions,
                    })
                    if (permissionsValidate == false) {
                        return reply.send({
                            error: true,
                            message: 'Required permissions not met',
                        })
                    }

                    let Promises = []
                    for (const category of categories) {
                        Promises.push(
                            new Promise((resolve, reject) => {
                                DisplayCategory({
                                    category,
                                    member,
                                    guild,
                                    client: discordClient,
                                }).then((res) => {
                                    resolve(res)
                                })
                            })
                        )
                    }

                    let return_categories: any = await Promise.all(Promises)

                    return reply.send(return_categories)
                }
            )

            instance.post(
                '/:guild_id/settings',
                async (request: any, reply: any) => {
                    AllowOnlyAuthorized({ request, reply })

                    const guild = await GetGuildByID({
                        guild_id: request.params.guild_id,
                        client: discordClient,
                    })
                    const member = await GetMemberFromGuildByID({
                        guild,
                        member_id: request.session.user.id,
                    })

                    const permissionsValidate = await VerifyUserPermissions({
                        member,
                        permissions: requiredPermissions,
                    })
                    if (permissionsValidate == false) {
                        return reply.send({
                            error: true,
                            message: 'Required permissions not met',
                        })
                    }

                    const { settings } = request.body
                    const errored_messages: object[] = []

                    for (const category_body of settings) {
                        const categoryData = categories.find(
                            (e: any) => e.id === category_body.id
                        )
                        for (const option_body of category_body.options) {
                            const optionData = categoryData.options.find(
                                (e: any) => e.id === option_body.id
                            )

                            //  TEST: If should be disabled for user on guild (this one displays error and blocks option if not met)
                            if (optionData.type?.disabled?.bool == true) {
                                //  TEST: If is globally disabled with option type
                                errored_messages.push({
                                    category: {
                                        id: categoryData.id,
                                        name: categoryData.name,
                                    },
                                    option: {
                                        id: optionData.id,
                                        name: optionData.id,
                                    },
                                    error: optionData.type?.disabled.reason,
                                })
                                continue
                            }

                            // TEST: If should be displayed for user on guild
                            if (optionData.shouldBeDisplayed) {
                                const display =
                                    await optionData.shouldBeDisplayed({
                                        guild,
                                        member,
                                    })
                                if (display == false) continue
                            }

                            //  TEST: If is disabled for user with prePermissionsCheck
                            if (optionData.permissionsValidate) {
                                const permissionsValidate =
                                    await optionData.permissionsValidate({
                                        guild,
                                        member,
                                    })
                                if (permissionsValidate) {
                                    errored_messages.push({
                                        category: {
                                            id: categoryData.id,
                                            name: categoryData.name,
                                        },
                                        option: {
                                            id: optionData.id,
                                            name: optionData.id,
                                        },
                                        error: permissionsValidate,
                                    })
                                    continue
                                }
                            }

                            // ServerSide Validation
                            const validated_error =
                                await optionData.serverSideValidation(
                                    option_body.newData,
                                    { guild, member }
                                )
                            if (validated_error) {
                                errored_messages.push({
                                    category: {
                                        id: categoryData.id,
                                        name: categoryData.name,
                                    },
                                    option: {
                                        id: optionData.id,
                                        name: optionData.id,
                                    },
                                    error: validated_error,
                                })
                                continue
                            }

                            // All test passed, set new value
                            await optionData.set(option_body.value, {
                                guild,
                                member,
                            })
                        }
                    }
                    return reply.send({ error: false, errored_messages })
                }
            )

            next()
        },
        { prefix: '/api/guild' }
    )
}
