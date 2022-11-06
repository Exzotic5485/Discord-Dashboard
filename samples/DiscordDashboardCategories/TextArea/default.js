const { TextArea } = require('../../../dist/index').FormTypes

let temp = null

module.exports = {
    name: 'Default',
    description: 'Change bot prefix easily',
    type: new TextArea()
        .setPlaceholder('Prefix')
        .setDefaultValue('!')
        .setGlobalDisabled(false, '')
        .setClientSideValidation((value) => {
            if (value == 'x') return "Value cannot be 'x'"
        }),
    get: async ({ member, guild }) => {
        return temp
    },
    set: async (newData, { member, guild }) => {
        temp = newData
    },
}
