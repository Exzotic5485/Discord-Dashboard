type SelectOption = {
    id: string
    value: string
} | null

export class Select {
    public settings: {
        name: string
        values: SelectOption[]
        defaultSelectedId: string | null
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
                id: 'ten',
                value: 'Ten',
            },
        ],
        defaultSelectedId: null,
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
        this.settings.defaultSelectedId = valueId
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

    /**
     * Validate the TextInput value on Client-Side.
     * Please note that this is not a Server-Side validator, but a function that will be called on the client side.
     * Don't use any libraries or anything else that is not natively supported by the browser.
     * Value to validate is passed as a parameter.
     *
     * @callback TextInput~ClientSideValidation
     * @param {string} value - The value to validate.
     */

    /**
     * Set the client side validation of the input.
     * Please note that this is not a Server-Side validator, but a function that will be called on the client side.
     * Don't use any libraries or anything else that is not natively supported by the browser.
     * Value to validate is passed as a parameter.
     *
     * @param {TextInput~ClientSideValidation} func - The client side validation of the input.
     */
    public setClientSideValidation(func: (value: SelectOption) => any) {
        this.settings.clientSideValidation = func.toString()
        return this
    }
}
