const { RoleSelect } = require('../../../dist/index').FormTypes

let temp = null

module.exports = {
    name: 'Default',
    description: 'Select channels default',
    type: new RoleSelect()
        .setLabel('Select value label')
        .addNoneWithText('None'),
    get: async ({ member, guild }) => {
        return temp
    },
    set: async (newData, { member, guild }) => {
        temp = newData
    },
}
