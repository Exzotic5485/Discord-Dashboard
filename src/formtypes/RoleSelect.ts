type SelectOption = {
    value: string | number | null
    display_name: string
}

export class RoleSelect {
    public settings: {
        name: string
        values: SelectOption[]
        defaultValue: string | null
        label: string
        disabled: {
            bool: boolean
            reason: string
        }
        allowEveryone: boolean
    } = {
        name: 'RoleSelect',
        values: [],
        defaultValue: null,
        label: 'Select role',
        disabled: {
            bool: false,
            reason: '',
        },
        allowEveryone: true
    }

    public disallowEveryone() {
        this.settings.allowEveryone = false
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
