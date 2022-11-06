module.exports = {
    id: 'a_textinput', // dbd auto-replaces ' ' to '_'
    showEnableDisableSwitch: true,
    usePromiseResolveSystem: true, // default true
    isDisabledGlobally: async ({ guild, member }) => {
        return false
    },
}
