import { CommandInteraction, Guild, GuildMember, GuildTextBasedChannel } from 'discord.js';

/** Custom command interaction class for avoiding null type checking */
export default class CustomInteraction extends CommandInteraction {
    guild: Guild;
    member: GuildMember;
    channel: GuildTextBasedChannel;
}
