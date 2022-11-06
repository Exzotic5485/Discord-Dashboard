export class CustomComponent {
    public settings: {
        name: string
        content: object
    } = {
        name: 'CustomComponent',
        content: [],
    }

    public setContent(content: object) {
        this.settings.content = content
        return this
    }
}
