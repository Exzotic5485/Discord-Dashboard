import { DiscordJsVersion } from "./DiscordjsHandlers"

export const DisplayOption = async ({ category, additional, option, member, guild, client }: any) => {
    const optionResponse: any = JSON.parse(JSON.stringify(option)) // to remove refference
    // CASE 1
    // shouldBeDisplayed not met (equals false)
    if(option.shouldBeDisplayed){
        const display = await option.shouldBeDisplayed({ member, guild })
        if(display == false) return { display: false, option: null }
    }

    // CASE 2
    // disabled on type-side
    if(option.type?.disabled?.bool == true) {
        optionResponse.allowed = false
        optionResponse.reason = option.type.disabled.reason
    }else{
        // CASE 3
        // prePermissionsCheck not met (!= null)

        if(option.permissionsValidate){
            const permissionsValidate = await option.permissionsValidate({ member, guild })
            if(permissionsValidate) {
                optionResponse.allowed = false
                optionResponse.reason = permissionsValidate
            }
        }
    }

    const tempValue = await option.get({ member, guild })
    optionResponse.value = (tempValue == null) ? option.type.defaultValue : tempValue

    if(additional.isDisabledGlobally){
        optionResponse.allowed = false
        optionResponse.reason = typeof(additional.isDisabledGlobally) === 'string' ? additional.isDisabledGlobally : 'Whole category is globally disabled'
    }

    (optionResponse.allowed === null || optionResponse.allowed === undefined) && (optionResponse.allowed = true)

    delete optionResponse.type.disabled
    delete optionResponse.type.defaultValue

    return { display: true, option: optionResponse }

}

export const CanChangeOption = async (props: { category: any, option: any, member: any, guild: any, client: any }) => {

}