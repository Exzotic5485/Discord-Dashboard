const { Checkbox } = require('../../../dist/index').FormTypes

let temp = null

module.exports = {
    name: 'Default',
    description: 'Change bot prefix easily',
    type: new Checkbox().setDefaultValue(false),
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
