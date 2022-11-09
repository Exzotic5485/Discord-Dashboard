type SelectOption = {
    value: string | number | null
    display_name: string
}

export class ChannelSelect {
    public settings: {
        name: string
        values: SelectOption[]
        defaultValue: string | null
        label: string
        disabled: {
            bool: boolean
            reason: string
        }
        types: any[]
    } = {
        name: 'ChannelSelect',
        values: [],
        defaultValue: null,
        label: 'Select channel',
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

    public addNoneWithText(text: string) {
        this.settings.values = [
            {
                value: null,
                display_name: text,
            },
        ]
        return this
    }

    public setLabel(label: string) {
        this.settings.label = label
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
