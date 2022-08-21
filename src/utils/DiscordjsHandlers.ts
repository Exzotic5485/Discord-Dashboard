import { version } from 'discord.js'
import PermissionsEnum from './DiscordPermissions'

export const DiscordJsVersion = version.split('.')[0]

export const GetGuildByID = async ({ guild_id, client }: any) => {
    let guildFound = client.guilds.cache.get(guild_id)
    if(!guildFound)guildFound = await client.guilds.fetch(guild_id)
    return guildFound
}

export const GetMemberFromGuildByID = async ({ guild, member_id}: any) => {
    let memberFound = guild.members.cache.get(member_id)
    if(!memberFound)memberFound = await guild.members.fetch(member_id)
    return memberFound
}

export const VerifyUserPermissions = async ({ member, permissions }: { member: any, permissions: [PermissionsEnum] }) => {
    return true
}
