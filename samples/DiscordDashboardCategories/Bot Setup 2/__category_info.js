

module.exports = {
    id: 'bot setup 2', // dbd auto-replaces ' ' to '_'
    showEnableDisableSwitch: true,
    usePromiseResolveSystem: true, // default true
    isDisabledGlobally: async ({ guild, member }) => {
        return false
    },
    isEnabled: async ({ guild, member }) => {
        return true
    },
    setEnabled: async (enabled, { guild, member }) => {

    }
}
