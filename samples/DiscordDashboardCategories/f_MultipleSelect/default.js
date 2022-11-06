const { MultipleSelect } = require('../../../dist/index').FormTypes

let temp = null

module.exports = {
    name: 'Default',
    description: 'Select default',
    type: new MultipleSelect().setPlaceholder('Select value label').setValues([
        {
            value: 10,
            display_name: 'Ten',
        },
        {
            value: 20,
            display_name: 'Twenty',
        },
    ]),
    get: async ({ member, guild }) => {
        return temp
    },
    set: async (newData, { member, guild }) => {
        temp = newData
    },
}
