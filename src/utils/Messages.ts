import { MessageEmbed } from 'discord.js';

/**
 * Template for success messages
 */
const success = () =>
    new MessageEmbed().setColor('GREEN').setTitle('Successful');

/**
 * Template for error messages
 */
const error = () => new MessageEmbed().setColor('RED').setTitle('Error');

export default {
    success,
    error
};
