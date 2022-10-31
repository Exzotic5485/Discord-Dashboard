const {TextInput} = require('../../../dist/index').FormTypes
const {TextInputManager, TextInputObjects} = require('../../../Themes/NextSample').ThemeOptions

let temp = null

module.exports = {
    name: 'Prefix but music!',
    description: 'Change bot prefix easily',
    type: new TextInput()
        .setPlaceholder('Prefix')
        .setDefaultValue('!')
        .setGlobalDisabled(false, '')
        .setClientSideValidation((value)=>{
            if(value == 'x')return "Value cannot be 'x'"
        })
        .setMinLength(1)
        .setMaxLength(10),
   themeOptions: new TextInputManager()
        .useEmojiPicker(true)
        .setLabel('Some label'),
    // dont display at all
    shouldBeDisplayed: async ({member, guild}) => {
        return true
    },
    // display with error
    permissionsValidate: async ({ member, guild }) => {
        const blacklisted = false
        if(blacklisted)return "You are blacklisted from this option"

        return null
    },
    // validate after submit before saving
    serverSideValidation: async (newData, { member, guild }) => {
        if(newData=='kurwa')return "Prefix cannot be 'kurwa'"
        return null
    },
    get: async ({ member, guild })=>{
        return temp
    },
    set: async (newData, { member, guild })=>{
        temp = newData
    }
}
