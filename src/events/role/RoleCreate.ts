import { Event } from '../../structures/Event';

export default new Event({
    name: 'roleCreate',
    run: async client => {
        await client.deployCommands();
    }
});
