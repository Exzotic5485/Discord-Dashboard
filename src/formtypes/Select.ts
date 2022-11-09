type SelectOption = {
    value: string | number | null
    display_name: string | null
}

export class Select {
    public settings: {
        name: string
        values: SelectOption[]
        defaultValue: string | null
        label: string
        disabled: {
            bool: boolean
            reason: string
        }
        clientSideValidation: string
    } = {
        name: 'Select',
        values: [
            {
                value: null,
                display_name: 'None',
            },
        ],
        defaultValue: null,
        label: 'Select value',
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
        this.settings.defaultValue = valueId
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
