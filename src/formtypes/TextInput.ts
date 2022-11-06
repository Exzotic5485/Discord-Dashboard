export class TextInput {
    public settings: {
        name: string
        defaultValue: string
        placeholder: string
        maxLength: number
        minLength: number
        required: boolean
        disabled: {
            bool: boolean
            reason: string
        }
        clientSideValidation: string
    } = {
        name: 'TextInput',
        defaultValue: '',
        placeholder: '',
        maxLength: 100,
        minLength: 0,
        required: false,
        disabled: {
            bool: false,
            reason: '',
        },
        clientSideValidation: '()=>{return null}',
    }

    public setDefaultValue(value: string) {
        this.settings.defaultValue = value
        return this
    }

    public setPlaceholder(value: string) {
        this.settings.placeholder = value
        return this
    }

    public setMaxLength(value: number) {
        this.settings.maxLength = value
        return this
    }

    public setMinLength(value: number) {
        this.settings.minLength = value
        return this
    }

    public setRequired(value: boolean) {
        this.settings.required = value
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
     * Validate the A_TextInput value on Client-Side.
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
