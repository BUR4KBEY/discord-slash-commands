import { GuildMember } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from '../structures/Command';
import messages from '../utils/Messages';

export default new Command({
    builder: new SlashCommandBuilder()
        .addUserOption(o =>
            o.setName('user').setDescription('The user').setRequired(true)
        )
        .addStringOption(o => o.setName('name').setDescription('Nickname'))
        .setName('set-nickname')
        .setDescription("Sets the user's nickname."),
    permissions: ['CHANGE_NICKNAME'],
    run: async ({ interaction }) => {
        const user = interaction.options.getMember('user') as GuildMember;
        const name = interaction.options.getString('name');

        if (name && name.length > 32)
            return await interaction.followUp({
                ephemeral: true,
                embeds: [
                    messages
                        .error()
                        .setDescription(
                            'The nickname can not be longer than 32 characters.'
                        )
                ]
            });

        await user.setNickname(name);

        await interaction.followUp({
            embeds: [
                messages.success().setDescription("The user's name updated.")
            ]
        });
    }
});
