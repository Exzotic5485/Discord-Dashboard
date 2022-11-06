const { CustomComponent } = require('../../../dist').FormTypes
const { HtmlComponent } =
    require('../../../Themes/NextSample').CustomComponentManagers

module.exports = {
    name: 'Custom Component!',
    /*
     * CUSTOM COMPONENT
     *
     * .setContent(content: object)
     * object - object of theme custom components from the component builder!
     * */
    type: new CustomComponent().setContent([
        new HtmlComponent('<h1>Hello world!</h1>'),
        new HtmlComponent('<h4>Hello world!</h4>'),
    ]),
}
