module.exports = {
    id: 'a_textinput', // dbd auto-replaces ' ' to '_'
    name: 'TextInput',
    showEnableDisableSwitch: true,
    usePromiseResolveSystem: true, // default true
    isDisabledGlobally: async ({ guild, member }) => {
        return false
    },
}
