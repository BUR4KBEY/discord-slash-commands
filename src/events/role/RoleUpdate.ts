import { Role } from 'discord.js';

import { Event } from '../../structures/Event';

export default new Event({
    name: 'roleUpdate',
    run: async (client, oldRole: Role, newRole: Role) => {
        if (oldRole.permissions !== newRole.permissions)
            await client.deployCommands();
    }
});
