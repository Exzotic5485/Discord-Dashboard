import { DiscordJsVersion } from "./DiscordjsHandlers"

export const DisplayOption = async ({ category, additional, option, member, guild, client }: any) => {
    // CASE 1
    // shouldBeDisplayed not met (equals false)
    if(option.shouldBeDisplayed){
        const display = await option.shouldBeDisplayed({ member, guild })
        if(display == false) return { display: false, option: null }
    }

    // CASE 2
    // disabled on type-side
    if(option.type?.disabled?.bool == true) {
        option.allowed = false
        option.reason = option.type.disabled.reason
    }else{
        // CASE 3
        // prePermissionsCheck not met (!= null)

        if(option.permissionsValidate){
            const permissionsValidate = await option.permissionsValidate({ member, guild })
            if(permissionsValidate) {
                option.allowed = false
                option.reason = permissionsValidate
            }
        }
    }

    const tempValue = await option.get({ member, guild })
    option.value = tempValue == null ? option.type.defaultValue : tempValue

    if(additional.isDisabledGlobally){
        option.allowed = false
        option.reason = typeof(additional.isDisabledGlobally) === 'string' ? additional.isDisabledGlobally : 'Whole category is globally disabled'
    }

    (option.allowed === null || option.allowed === undefined) && (option.allowed = true)

    option.type.disabled = undefined

    return { display: true, option }

}

export const CanChangeOption = async (props: { category: any, option: any, member: any, guild: any, client: any }) => {

}