

module.exports = {
    id: 'my custom_id', // dbd auto-replaces ' ' to '_'
    showEnableDisableSwitch: true,
    usePromiseResolveSystem: true, // default true
    isDisabledGlobally: async ({ guild, member }) => {
        return true
    },
    isEnabled: async ({ guild, member }) => {
        return false
    },
    setEnabled: async (enabled, { guild, member }) => {

    }
}
