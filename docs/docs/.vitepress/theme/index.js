import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { isInvalidRoute, redirect } from './plugins/redirect'

const theme = {
    ...DefaultTheme,
    enhanceApp({ app, router }) {
        if (inBrowser) {
            if (isInvalidRoute()) {
                redirect()
            }
        }
    },
}

export default theme
