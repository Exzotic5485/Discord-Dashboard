export class Checkbox {
    public settings: {
        name: string
        defaultValue: boolean
        disabled: {
            bool: boolean
            reason: string
        }
    } = {
        name: 'Checkbox',
        defaultValue: false,
        disabled: {
            bool: false,
            reason: '',
        },
    }

    public setDefaultValue(enabled: boolean) {
        this.settings.defaultValue = enabled
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
