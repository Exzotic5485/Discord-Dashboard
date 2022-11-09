type SelectOption = {
    value: string | number
    display_name: string | null
}

export class MultipleChannelSelect {
    public settings: {
        name: string
        values: SelectOption[]
        defaultValue: string[]
        placeholder: string
        disabled: {
            bool: boolean
            reason: string
        }
        types: any[]
    } = {
        name: 'MultipleChannelSelect',
        values: [],
        defaultValue: [],
        placeholder: 'Select channels',
        disabled: {
            bool: false,
            reason: '',
        },
        types: []
    }

    public allowTypes(types: any[]) {
        this.settings.types = types
        return this
    }

    public setPlaceholder(placeholder: string) {
        this.settings.placeholder = placeholder
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
