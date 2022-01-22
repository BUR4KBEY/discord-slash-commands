import { CommandInteraction } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from '../structures/Command';

export default new Command({
    builder: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong.'),
    run: async ({ interaction }) => {
        await interaction.followUp('Pong');
    }
});
