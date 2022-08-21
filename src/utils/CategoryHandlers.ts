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

    let displayOptions: any = []

    if(category.usePromiseResolveSystem){
        let Promises = []
        for(let option of category.options){
            Promises.push(new Promise((resolve,reject)=>{
                DisplayOption({ category, additional, option, member, guild, client: client }).then(res=>{
                    resolve(res)
                })
            }))
        }
        displayOptions = await Promise.all(Promises)
    }else{
        for(let option of category.options){
            const res = await DisplayOption({ category, additional, option, member, guild, client: client })
            displayOptions.push(res)
        }
    }

    return {
        name: category.name,
        id: category.id,
        ...additional,
        options: JSON.parse(JSON.stringify(displayOptions.filter((option: any)=>option.display != false)))
    }
}