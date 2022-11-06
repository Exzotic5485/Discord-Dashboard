const { Switch } = require('../../../dist/index').FormTypes
const { TextInputManager, TextInputObjects } =
    require('../../../Themes/NextSample').ThemeOptions

let temp = null

module.exports = {
    name: 'Prefix but music!',
    description: 'Change bot prefix easily',
    type: new Switch().setDefaultValue(false),
    // display with error
    permissionsValidate: async ({ member, guild }) => {
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
        return temp
    },
    set: async (newData, { member, guild }) => {
        temp = newData
    },
}
