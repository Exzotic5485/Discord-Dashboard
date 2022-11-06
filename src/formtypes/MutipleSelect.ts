type SelectOption = {
    value: string | number
    display_name: string | null
}

export class MultipleSelect {
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
        name: 'MultipleSelect',
        values: [
            {
                value: 'default',
                display_name: 'Default',
            },
            {
                value: 'default2',
                display_name: 'Default 2',
            },
        ],
        defaultValue: [],
        placeholder: 'Select value',
        disabled: {
            bool: false,
            reason: '',
        },
        clientSideValidation: '()=>{return null}',
    }

    public setValues(values: SelectOption[]) {
        this.settings.values = values
        return this
    }

    public setDefaultSelectedId(valueId: string) {
        this.settings.defaultValue.push(valueId)
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
