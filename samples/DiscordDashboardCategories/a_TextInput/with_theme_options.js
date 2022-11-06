const { TextInput } = require('../../../dist').FormTypes
const { TextInputManager, TextInputObjects } =
    require('../../../Themes/NextSample').ThemeOptions

let temp = null

module.exports = {
    name: 'With ThemeOptions',
    description: 'Change bot prefix easily',
    type: new TextInput()
        .setPlaceholder('Prefix')
        .setDefaultValue('!')
        .setGlobalDisabled(false, '')
        .setClientSideValidation((value) => {
            if (value == 'x') return "Value cannot be 'x'"
        }),
    themeOptions: new TextInputManager()
        .useEmojiPicker(true)
        .useCustomStyle(TextInputObjects.optionContainer, {
            backgroundColor: '#ff0000',
        })
        .setLabel('Label!'),
    // dont display at all
    shouldBeDisplayed: async ({ member, guild }) => {
        return true
    },
    // display with error
    permissionsValidate: async ({ member }) => {
        const blacklisted = false
        if (blacklisted) return 'You are blacklisted from this option'

        return null
    },
    // validate after submit before saving
    serverSideValidation: async (newData, { member, guild }) => {
        if (newData == 'kurwa') return "Prefix cannot be 'kurwa'"
        return null
    },
    get: async ({ member, guild }) => {
        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
        }

        return temp
    },
    set: async (newData, { member, guild }) => {
        temp = newData
    },
}