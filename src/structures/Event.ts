import { ClientEvents } from 'discord.js';

import CustomClient from './CustomClient';

export class Event {
    /**
     * Event name
     */
    name: keyof ClientEvents;

    /**
     * Runs the event
     */
    run: (client: CustomClient, ...eventArgs: any) => any;

    /**
     * Creates a new event
     * @param options Event options
     */
    constructor(options: NonNullable<Event>) {
        Object.assign(this, options);
    }
}
