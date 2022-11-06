import { DiscordJsVersion } from './DiscordjsHandlers'
const Discord = require('discord.js')

const PERMISSIONS =
    DiscordJsVersion == '13'
        ? Discord.Permissions.FLAGS
        : Discord.PermissionsBitField.Flags

enum PermissionsEnum {
    CREATE_INSTANT_INVITE = DiscordJsVersion == '13'
        ? PERMISSIONS.CREATE_INSTANT_INVITE
        : PERMISSIONS.CreateInstantInvite,
    KICK_MEMBERS = DiscordJsVersion == '13'
        ? PERMISSIONS.KICK_MEMBERS
        : PERMISSIONS.KickMembers,
    BAN_MEMBERS = DiscordJsVersion == '13'
        ? PERMISSIONS.BAN_MEMBERS
        : PERMISSIONS.BanMembers,
    ADMINISTRATOR = DiscordJsVersion == '13'
        ? PERMISSIONS.ADMINISTRATOR
        : PERMISSIONS.Administrator,
    MANAGE_CHANNELS = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_CHANNELS
        : PERMISSIONS.ManageChannels,
    MANAGE_GUILD = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_GUILD
        : PERMISSIONS.ManageGuild,
    ADD_REACTIONS = DiscordJsVersion == '13'
        ? PERMISSIONS.ADD_REACTIONS
        : PERMISSIONS.AddReactions,
    VIEW_AUDIT_LOG = DiscordJsVersion == '13'
        ? PERMISSIONS.VIEW_AUDIT_LOG
        : PERMISSIONS.ViewAuditLog,
    PRIORITY_SPEAKER = DiscordJsVersion == '13'
        ? PERMISSIONS.PRIORITY_SPEAKER
        : PERMISSIONS.PrioritySpeaker,
    STREAM = DiscordJsVersion == '13' ? PERMISSIONS.STREAM : PERMISSIONS.Stream,
    VIEW_CHANNEL = DiscordJsVersion == '13'
        ? PERMISSIONS.VIEW_CHANNEL
        : PERMISSIONS.ViewChannel,
    SEND_MESSAGES = DiscordJsVersion == '13'
        ? PERMISSIONS.SEND_MESSAGES
        : PERMISSIONS.SendMessages,
    SEND_TTS_MESSAGES = DiscordJsVersion == '13'
        ? PERMISSIONS.SEND_TTS_MESSAGES
        : PERMISSIONS.SendTTSMessages,
    MANAGE_MESSAGES = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_MESSAGES
        : PERMISSIONS.ManageMessages,
    EMBED_LINKS = DiscordJsVersion == '13'
        ? PERMISSIONS.EMBED_LINKS
        : PERMISSIONS.EmbedLinks,
    ATTACH_FILES = DiscordJsVersion == '13'
        ? PERMISSIONS.ATTACH_FILES
        : PERMISSIONS.AttachFiles,
    READ_MESSAGE_HISTORY = DiscordJsVersion == '13'
        ? PERMISSIONS.READ_MESSAGE_HISTORY
        : PERMISSIONS.ReadMessageHistory,
    MENTION_EVERYONE = DiscordJsVersion == '13'
        ? PERMISSIONS.MENTION_EVERYONE
        : PERMISSIONS.MentionEveryone,
    USE_EXTERNAL_EMOJIS = DiscordJsVersion == '13'
        ? PERMISSIONS.USE_EXTERNAL_EMOJIS
        : PERMISSIONS.UseExternalEmojis,
    VIEW_GUILD_INSIGHTS = DiscordJsVersion == '13'
        ? PERMISSIONS.VIEW_GUILD_INSIGHTS
        : PERMISSIONS.ViewGuildInsights,
    CONNECT = DiscordJsVersion == '13'
        ? PERMISSIONS.CONNECT
        : PERMISSIONS.Connect,
    SPEAK = DiscordJsVersion == '13' ? PERMISSIONS.SPEAK : PERMISSIONS.Speak,
    MUTE_MEMBERS = DiscordJsVersion == '13'
        ? PERMISSIONS.MUTE_MEMBERS
        : PERMISSIONS.MuteMembers,
    DEAFEN_MEMBERS = DiscordJsVersion == '13'
        ? PERMISSIONS.DEAFEN_MEMBERS
        : PERMISSIONS.DeafenMembers,
    MOVE_MEMBERS = DiscordJsVersion == '13'
        ? PERMISSIONS.MOVE_MEMBERS
        : PERMISSIONS.MoveMembers,
    USE_VAD = DiscordJsVersion == '13'
        ? PERMISSIONS.USE_VAD
        : PERMISSIONS.UseVAD,
    CHANGE_NICKNAME = DiscordJsVersion == '13'
        ? PERMISSIONS.CHANGE_NICKNAME
        : PERMISSIONS.ChangeNickname,
    MANAGE_NICKNAMES = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_NICKNAMES
        : PERMISSIONS.ManageNicknames,
    MANAGE_ROLES = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_ROLES
        : PERMISSIONS.ManageRoles,
    MANAGE_WEBHOOKS = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_WEBHOOKS
        : PERMISSIONS.ManageWebhooks,
    MANAGE_EMOJIS_AND_STICKERS = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_EMOJIS_AND_STICKERS
        : PERMISSIONS.ManageEmojisAndStickers,
    USE_APPLICATION_COMMANDS = DiscordJsVersion == '13'
        ? PERMISSIONS.USE_APPLICATION_COMMANDS
        : PERMISSIONS.UseApplicationCommands,
    REQUEST_TO_SPEAK = DiscordJsVersion == '13'
        ? PERMISSIONS.REQUEST_TO_SPEAK
        : PERMISSIONS.RequestToSpeak,
    MANAGE_EVENTS = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_EVENTS
        : PERMISSIONS.ManageEvents,
    MANAGE_THREADS = DiscordJsVersion == '13'
        ? PERMISSIONS.MANAGE_THREADS
        : PERMISSIONS.ManageThreads,
    CREATE_PUBLIC_THREADS = DiscordJsVersion == '13'
        ? PERMISSIONS.CREATE_PUBLIC_THREADS
        : PERMISSIONS.CreatePublicThreads,
    CREATE_PRIVATE_THREADS = DiscordJsVersion == '13'
        ? PERMISSIONS.CREATE_PRIVATE_THREADS
        : PERMISSIONS.CreatePrivateThreads,
    USE_EXTERNAL_STICKERS = DiscordJsVersion == '13'
        ? PERMISSIONS.USE_EXTERNAL_STICKERS
        : PERMISSIONS.UseExternalStickers,
    SEND_MESSAGES_IN_THREADS = DiscordJsVersion == '13'
        ? PERMISSIONS.SEND_MESSAGES_IN_THREADS
        : PERMISSIONS.SendMessagesInThreads,
    START_EMBEDDED_ACTIVITIES = DiscordJsVersion == '13'
        ? PERMISSIONS.START_EMBEDDED_ACTIVITIES
        : PERMISSIONS.StartEmbeddedActivities,
    MODERATE_MEMBERS = DiscordJsVersion == '13'
        ? PERMISSIONS.MODERATE_MEMBERS
        : PERMISSIONS.ModerateMembers,
}

export default PermissionsEnum