import { DiscordJsVersion } from './DiscordjsHandlers'

export const DisplayOption = async ({
    category,
    additional,
    option,
    member,
    guild,
    client,
}: any) => {
    const optionResponse: any = JSON.parse(JSON.stringify(option)) // to remove refference

    if (optionResponse.type.name == 'CustomComponent')
        return { display: true, option: optionResponse }

    // CASE 1
    // shouldBeDisplayed not met (equals false)
    if (option.shouldBeDisplayed) {
        const display = await option.shouldBeDisplayed({ member, guild })
        if (display == false) return { display: false, option: null }
    }

    // CASE 2
    // disabled on type-side
    if (option.type?.disabled?.bool == true) {
        optionResponse.allowed = false
        optionResponse.reason = option.type.disabled.reason
    } else {
        // CASE 3
        // prePermissionsCheck not met (!= null)

        if (option.permissionsValidate) {
            const permissionsValidate = await option.permissionsValidate({
                member,
                guild,
            })
            if (permissionsValidate) {
                optionResponse.allowed = false
                optionResponse.reason = permissionsValidate
            }
        }
    }

    if (
        optionResponse.type.name == 'ChannelSelect' ||
        optionResponse.type.name == 'MultipleChannelSelect'
    ) {
        optionResponse.type.values = [
            ...optionResponse.type.values,
            ...client.guilds.cache
                .get(guild.id)
                .channels.cache.map((channel: any) => {
                    if(optionResponse.type.types.length > 0) {
                        if(!optionResponse.type.types.includes(channel.type)) return null
                    }
                    return {
                        value: channel.id,
                        display_name: '#' + channel.name,
                    }
                }).filter((e: any)=>e!=null),
        ]
    }

    if (
        optionResponse.type.name == 'RoleSelect' ||
        optionResponse.type.name == 'MultipleRoleSelect'
    ) {
        optionResponse.type.values = [
            ...optionResponse.type.values,
            ...client.guilds.cache
                .get(guild.id)
                .roles.cache.map((role: any) => {
                    if(!optionResponse.type.allowEveryone) {
                        if(role.name == '@everyone') return null
                    }
                    return {
                        value: role.id,
                        display_name: role.name.startsWith('@') ? role.name : '@' + role.name,
                    }
                }).filter((e: any)=>e!=null),
        ]
    }

    const tempValue = await option.get({ member, guild })
    optionResponse.value =
        tempValue == null ? option.type.defaultValue : tempValue

    if (additional.isDisabledGlobally) {
        optionResponse.allowed = false
        optionResponse.reason =
            typeof additional.isDisabledGlobally === 'string'
                ? additional.isDisabledGlobally
                : 'Whole category is globally disabled'
    }

    ;(optionResponse.allowed === null ||
        optionResponse.allowed === undefined) &&
        (optionResponse.allowed = true)

    delete optionResponse.type.disabled
    delete optionResponse.type.defaultValue

    return { display: true, option: optionResponse }
}

export const CanChangeOption = async (props: {
    category: any
    option: any
    member: any
    guild: any
    client: any
}) => {}
