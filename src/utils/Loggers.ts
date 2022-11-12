import colors from 'colors'
const version = require('../../package.json').version

export function InfoLog(Text: any) {
    colors.enable()
    console.log(colors.green(`[Discord-Dashboard v${version}] `) + Text)
    colors.disable()
}

export function WarningLog(Text: any) {
    colors.enable()
    console.log(colors.yellow(`[Discord-Dashboard v${version}] `) + Text)
    colors.disable()
}

export function ErrorLog(Text: any) {
    colors.enable()
    console.log(colors.red(`[Discord-Dashboard v${version}] `) + colors.red(Text))
    colors.disable()
}

export function ErrorThrower(ErrorText: any) {
    colors.enable()
    const ErrorInfo = `Discord-Dashboard v${version} Error:`
    const DoYouNeedHelp = `Do you need help? Join our Discord support server: https://discord.gg/6Yv5U9V3ux\n`
    throw new Error(
        `${ErrorInfo.red.bold} ${ErrorText.bold}\n       ${DoYouNeedHelp.blue.italic}`
    )
}
