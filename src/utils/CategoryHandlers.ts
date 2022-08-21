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

    let Promises = []
    for(let option of category.options){
        Promises.push(new Promise((resolve,reject)=>{
            DisplayOption({ category, additional, option, member, guild, client: client }).then(res=>{
                resolve(res)
            })
        }))
    }
    const displayOptions: any = await Promise.all(Promises)

    return {
        name: category.name,
        id: category.id,
        ...additional,
        options: JSON.parse(JSON.stringify(displayOptions.filter((option: any)=>option.display != false)))
    }
}