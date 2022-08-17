export const router: (props: any)=>void = (props: { requiredPermissions: [string,number][], fastify: any, discordClient: any, categories: any }) => {
    props.fastify.register((instance: any, opts: any, next: any)=>{
        instance.get('/:guild_id/settings', async (request: any, reply: any) => {
            const member_id = request.session?.user?.id
            if(!member_id) return reply.code(401).send({ error: 'You are not logged in' })
            const guild = props.discordClient.guilds.cache.get(request.params.guild_id)
            const member = guild.members.cache.get(member_id)

            //if(!member.hasPermissions('MANAGE_GUILD')) return reply.code(403).send({ error: 'You do not have permission to manage this guild' })

            let return_categories: any = [];

            for(const category of props.categories) {
                let additional: any = {
                    isDisabledGlobally: (await category.isDisabledGlobally({ guild, member }))
                }
                if(!additional.isDisabledGlobally){
                    additional = {
                        ...additional,
                        showEnableDisableSwitch: category.showEnableDisableSwitch,
                    }
                }
                if(category.showEnableDisableSwitch === true && !additional.isDisabledGlobally){
                    additional = {
                        ...additional,
                        isEnabled: (await category.isEnabled({ guild, member }))
                    }
                }
                return_categories.push({
                    name: category.name,
                    id: category.id,
                    ...additional,
                    options: []
                })
                for(const option of category.options){
                    // If should be displayed for user on guild (this one doesn't display option at all)
                    if(option.shouldBeDisplayed){
                        const display = await option.shouldBeDisplayed({ member, guild })
                        if(display == false) continue
                    }

                    // If should be disabled for user on guild (this one displays error and blocks option if not met)
                    if(option.type?.disabled?.bool == true) {
                        // If is globally disabled with option type
                        option.allowed = false
                        option.reason = option.type.disabled.reason
                    }else{
                        // If is disabled for user with prePermissionsCheck
                        if(option.permissionsValidate){
                            const permissionsValidate = await option.permissionsValidate({ member, guild })
                            if(permissionsValidate) {
                                option.allowed = false
                                option.reason = permissionsValidate
                            }
                        }
                    }

                    // Get actual value
                    let tempValue = await option.get({ member, guild })
                    option.value = tempValue == null ? option.type.defaultValue : tempValue

                    // Delete unnecessary properties
                    delete option.type.disabled

                    // Overwrite allowed if category is globally disabled
                    if(additional.isDisabledGlobally){
                        option.allowed = false
                        option.reason = typeof(additional.isDisabledGlobally) === 'string' ? additional.isDisabledGlobally : 'Whole category is globally disabled'
                    }

                    if(option.allowed === null || option.allowed === undefined) {
                        option.allowed = true
                    }

                    // Add to return
                    return_categories[return_categories.length-1].options.push(JSON.parse(JSON.stringify(option)))
                }
            }

            return reply.send(return_categories)
        })

        instance.post('/:guild_id/settings', async (request: any, reply: any) => {
            const { settings } = request.body
            const errored_messages: object[] = []

            const member_id = request.session?.user?.id
            if(!member_id) return reply.code(401).send({ error: 'You are not logged in' })
            const guild = props.discordClient.guilds.cache.get(request.params.guild_id)
            const member = guild.members.cache.get(member_id)

            for(const category_body of settings){
                const categoryData = props.categories.find((e:any)=>e.id === category_body.id)
                for(const option_body of category_body.options){
                    const optionData = categoryData.options.find((e:any)=>e.id === option_body.id)

                    //  TEST: If should be disabled for user on guild (this one displays error and blocks option if not met)
                    if(optionData.type?.disabled?.bool == true) {
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
                            error: optionData.type?.disabled.reason
                        })
                        continue
                    }

                    // TEST: If should be displayed for user on guild
                    if(optionData.shouldBeDisplayed){
                        const display = await optionData.shouldBeDisplayed({ guild, member })
                        if(display == false) continue
                    }

                    //  TEST: If is disabled for user with prePermissionsCheck
                    if(optionData.permissionsValidate){
                        const permissionsValidate = await optionData.permissionsValidate({ guild, member })
                        if(permissionsValidate) {
                            errored_messages.push({
                                category: {
                                    id: categoryData.id,
                                    name: categoryData.name,
                                },
                                option: {
                                    id: optionData.id,
                                    name: optionData.id,
                                },
                                error: permissionsValidate
                            })
                            continue
                        }
                    }

                    // ServerSide Validation
                    const validated_error = await optionData.serverSideValidation(option_body.newData, { guild, member })
                    if(validated_error){
                        errored_messages.push({
                            category: {
                                id: categoryData.id,
                                name: categoryData.name,
                            },
                            option: {
                                id: optionData.id,
                                name: optionData.id,
                            },
                            error: validated_error
                        })
                        continue
                    }

                    // All test passed, set new value
                    await optionData.set(option_body.value, { guild, member })
                }
            }
            return reply.send({error:false,errored_messages})
        })

        next()
    }, { prefix: '/api/guild' })
}