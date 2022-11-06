const { MultipleRoleSelect } = require('../../../dist/index').FormTypes

let temp = null

module.exports = {
    name: 'Default',
    description: 'Select channel default',
    type: new MultipleRoleSelect().setPlaceholder('Select value label'),
    get: async ({ member, guild }) => {
        return temp
    },
    set: async (newData, { member, guild }) => {
        temp = newData
    },
}