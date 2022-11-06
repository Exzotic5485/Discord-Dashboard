type SelectOption = {
    value: string | number
    display_name: string | null
}

export class MultipleRoleSelect {
    public settings: {
        name: string
        values: SelectOption[]
        defaultValue: string[]
        placeholder: string
        disabled: {
            bool: boolean
            reason: string
        }
        clientSideValidation: string
    } = {
        name: 'MultipleRoleSelect',
        values: [],
        defaultValue: [],
        placeholder: 'Select roles',
        disabled: {
            bool: false,
            reason: '',
        },
        clientSideValidation: '()=>{return null}',
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
