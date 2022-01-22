import {
    ApplicationCommandPermissionData,
    Client,
    Collection,
    GuildApplicationCommandPermissionData
} from 'discord.js';
import path from 'path';
import requireAll from 'require-all';

import { handleEvent } from '../utils/Handlers';
import { Command } from './Command';
import { Event } from './Event';

export default class CustomClient extends Client {
    /**
     * Command collection
     */
    commands: Collection<string, Command> = new Collection();

    /**
     * Ids of the developers
     */
    developers: string[];

    /**
     * Creates a custom discord client
     */
    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
        });
    }

    /**
     * Starts the bot
     */
    async start() {
        this.developers = process.env.DEVELOPERS!.split(' ');

        await this.resolveModules();
        await this.login(process.env.TOKEN);
    }

    /**
     * Resolves events and commands
     */
    async resolveModules() {
        const sharedSettings = {
            recursive: true,
            filter: /\w*.[tj]s/g
        };

        // Commands
        requireAll({
            ...sharedSettings,
            dirname: path.join(__dirname, '../commands'),
            resolve: x => {
                const command = x.default as Command;

                if (command.disabled) return;
                if (command.permissions)
                    command.builder.setDefaultPermission(false);

                console.log(`Command '${command.builder.name}' registered.`);
                this.commands.set(command.builder.name, command);
            }
        });

        // Events
        requireAll({
            ...sharedSettings,
            dirname: path.join(__dirname, '../events'),
            resolve: x => {
                const event = x.default as Event;
                console.log(`Event '${event.name}' registered.`);
                handleEvent(this, event);
            }
        });
    }

    /**
     * Deploys commands to the guild
     */
    async deployCommands() {
        const guild = this.guilds.cache.get(process.env.GUILD_ID!)!;
        const commandsJSON = [...this.commands.values()].map(x =>
            x.builder.toJSON()
        );
        const commandsCol = await guild.commands.set(commandsJSON);

        const getRoles = (name: string) => {
            const perms = this.commands.find(
                c => c.builder.name === name
            )?.permissions;

            if (!perms) return null;
            else
                return guild.roles.cache.filter(
                    r => r.permissions.has(perms) && !r.managed
                );
        };

        const devArr: ApplicationCommandPermissionData[] = this.developers.map(
            x => {
                return {
                    id: x,
                    type: 'USER',
                    permission: true
                };
            }
        );

        const fullPermissions = commandsCol.reduce<
            GuildApplicationCommandPermissionData[]
        >((a, b) => {
            const roles = getRoles(b.name);
            if (!roles) return a;

            const command = this.commands.get(b.name)!;

            if (command.onlyDev)
                return [
                    ...a,
                    {
                        id: b.id,
                        permissions: devArr
                    }
                ];

            const permissions = roles.reduce<
                ApplicationCommandPermissionData[]
            >((x, y) => {
                return [
                    ...x,
                    {
                        id: y.id,
                        type: 'ROLE',
                        permission: true
                    }
                ];
            }, devArr);

            return [
                ...a,
                {
                    id: b.id,
                    permissions
                }
            ];
        }, []);

        await guild.commands.permissions.set({ fullPermissions });
    }
}
