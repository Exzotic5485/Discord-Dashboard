import { inBrowser } from 'vitepress'

export const redirectMap = {
    update: 'upgrade',
}

export function getRouteName() {
    if (!inBrowser) return ''
    const { pathname } = window.location
    const routeName = pathname.slice(1)
    return routeName
}

export function isInvalidRoute() {
    if (!inBrowser) return false
    const routeName = getRouteName()
    if (routeName == 'v3.html' || routeName == 'v3') {
        redirect('/v3/')
    } else if (routeName == 'themes.html' || routeName == 'themes') {
        redirect('/themes/')
    } else if (routeName == 'themes/v3.html' || routeName == 'themes/v3') {
        redirect('/themes/v3/')
    } else if (
        routeName == 'themes/v3/kardex.html' ||
        routeName == 'themes/v3/kardex'
    ) {
        redirect('/themes/v3/kardex/')
    }
}

export function redirect(to) {
    if (!inBrowser) return
    window.location.replace(to)
}
