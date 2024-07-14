# Discord Slash Commands

## 🌟 About

Template for slash commands in discord.js made with Typescript.

This template made for private projects (single server).

## 📜 Features

-   Permission system
    -   You can create commands available for custom permissions.
-   Developer only commands
    -   You can create commands only available for developers.
-   Disable commands
    -   You can disable the commands if you don't want to use.

## 📥 Installation

You can use `npm` instead of `yarn` but i recommended to use `yarn`.

```
yarn install
```

## ⚙️ Setting Up

-   Rename `.env.example` to `.env` and fill it.
-   If you want to change intents, edit `src/structures/CustomClient.ts`.

## 🤖 Running The Bot

-   Without Building
    -   Type `yarn dev` to run.
-   With Building
    -   Type `yarn build` to build the project.
    -   Type `yarn start` to run the builded project.

---

## 📌 Important

Never use `interaction#reply` method because in the handler we're deffering it. Use `interaction#followUp` method for replying.

```ts
import { CommandInteraction } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from '../structures/Command';

export default new Command({
    builder: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong.'),
    run: async ({ interaction }) => {
        // Bad, will throw error
        await interaction.reply('Pong');

        // Good
        await interaction.followUp('Pong');
    }
});
```

## ☕ Support

If you find this project useful and would like to support [me](https://github.com/BUR4KBEY), you can do so by visiting [my website](https://burakbey.dev).

<a href="https://burakbey.dev" target="_blank"><img src="https://burakbey.dev/github_support_snippet.png" style="height: 56px !important;width: 200px !important;" alt="Buy me a coffee"></img></a>
