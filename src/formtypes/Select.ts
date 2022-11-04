export class Select {
    public settings: {
        name: string
        values: object
        defaultSelectedId: string
        disabled: {
            bool: boolean
            reason: string
        }
        clientSideValidation: string
    } = {
        name: 'Select',
        values: {},
        defaultSelectedId: '',
        disabled: {
            bool: false,
            reason: '',
        },
        clientSideValidation: '()=>{return null}',
    }

    public setValues(values: object) {
        this.settings.values = values
        return this
    }

    public setDefaultSelectedId(valueId: string) {
        this.settings.defaultSelectedId = valueId
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
    public setClientSideValidation(func: (value: string) => any) {
        this.settings.clientSideValidation = func.toString()
        return this
    }
}
