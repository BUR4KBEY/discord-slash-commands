import { PermissionResolvable } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

import CustomClient from './CustomClient';
import CustomInteraction from './CustomInteraction';

/** Arguments for command */
export type CommandArgs = {
    /**
     * Client
     */
    client: CustomClient;

    /**
     * Interaction
     */
    interaction: CustomInteraction;
};

export class Command {
    /**
     * If true, disables the command
     */
    disabled?: boolean;

    /**
     * Required permissions to run the command
     */
    permissions?: PermissionResolvable[];

    /**
     * If true, only developers can run the command
     */
    onlyDev?: boolean;

    /**
     * Slash command builder
     */
    builder: SlashCommandBuilder;

    /**
     * Runs the command
     */
    run: (args: CommandArgs) => any;

    /**
     * Creates a new command
     * @param options Command options
     */
    constructor(options: NonNullable<Command>) {
        Object.assign(this, options);
    }
}
