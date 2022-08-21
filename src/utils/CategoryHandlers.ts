import { DiscordJsVersion } from "./DiscordjsHandlers"
import { DisplayOption } from "./OptionHandlers"

export const DisplayCategory = async ({ category, member, guild, client }: any) => {
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

    let return_category: any = {
        name: category.name,
        id: category.id,
        ...additional,
        options: []
    }
    
    for(let option of category.options){
        const option_validation = await DisplayOption({ category, additional, option, member, guild, client: client })
        if(option_validation.display == false){
            continue
        }else{
            option = option_validation.option
        }

        return_category.options.push(JSON.parse(JSON.stringify(option)))
    }

    return return_category
}