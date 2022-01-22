import { Event } from '../structures/Event';

export default new Event({
    name: 'ready',
    run: async client => {
        console.log('Deploying commands...');
        await client.deployCommands();
        console.log('Ready');
    }
});
