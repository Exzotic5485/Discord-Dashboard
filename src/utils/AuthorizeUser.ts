export default async function AuthorizeUser(_props: {oauth:any, props: any, token: any, request: any, reply: any}) {
    const {oauth, props, token, request, reply} = _props
    const User = await oauth.getUser(token.access_token)
    request.session.user = {
        id: User.id,
        username: User.username,
        discriminator: User.discriminator,
        avatar: User.avatar,
        email: User.email,
        verified: User.verified,
        // @ts-ignore
        avatarURL: User.avatar ? `https://cdn.discordapp.com/avatars/${User.id}/${User.avatar}.png?size=1024` : `https://cdn.discord.com/embed/avatars/${User.discriminator%5}.png`
    }
    const Guilds = await oauth.getUserGuilds(token.access_token)
    let returnGuild = []
    for(const guild of Guilds){
        let doIt = true
        if(doIt){
            returnGuild.push({
                ...guild,
                iconURL: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : `https://cdn.discordapp.com/embed/avatars/0.png`,
            })
        }
    }
    request.session.guilds = returnGuild
    return reply.redirect('/')
}
