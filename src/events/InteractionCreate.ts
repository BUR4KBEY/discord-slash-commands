import { Interaction } from 'discord.js';

import { Event } from '../structures/Event';
import { handleCommand } from '../utils/Handlers';

export default new Event({
    name: 'interactionCreate',
    run: async (client, interaction: Interaction) => {
        if (interaction.isCommand()) {
            await handleCommand(client, interaction);
        }
    }
});
