export class Switch {
    public settings: {
        name: string
        defaultEnabled: boolean
        disabled: {
            bool: boolean
            reason: string
        }
    } = {
        name: 'Switch',
        defaultEnabled: false,
        disabled: {
            bool: false,
            reason: '',
        },
    }

    public setDefaultEnabled(enabled: boolean) {
        this.settings.defaultEnabled = enabled
        return this
    }

    public setGlobalDisabled(value: boolean, reason: string) {
        this.settings.disabled = {
            bool: value,
            reason: reason,
        }
        return this
    }
}
