module.exports = {
    id: 'c_switch',
    showEnableDisableSwitch: true,
    usePromiseResolveSystem: true,
    isEnabled: async () => {
        return true
    },
    setEnabled: async (enabled, { guild, member }) => {},
}
