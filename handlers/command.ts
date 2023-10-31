import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { promises } from 'fs';
const { readdir } = promises;
import { join, relative } from 'path';
import type { Command } from '../types.d.js';
import * as url from 'url';
import { getDirectories } from '../utils/file.js';
import * as log from '../utils/log.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function registerCommands(commands: SlashCommandBuilder[]) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: commands });

  log.info(`🤖 Successfully loaded ${commands.length} application commands.`);
}

async function loadCommands(client: Client) {
  const commands: SlashCommandBuilder[] = [];
  const commandsDir: string = join(dirname, '../commands');
  const directories: string[] = getDirectories(commandsDir);

  await Promise.all(
    directories.map(async (directory: string) => {
      const files: string[] = await readdir(directory);

      await Promise.all(
        files.map(async (file: string) => {
          if (!file.endsWith('.js')) return;

          const relativePath: string = relative(commandsDir, directory);

          const command: Command = await import(`file://${commandsDir}/${relativePath}/${file}`).then(m => m.default);
          commands.push(command.command);
          client.commands.set(command.command.name, command);
        }),
      ).catch(err => log.error(`Failed to load application commands: ${err}`));
    }),
  );

  return commands;
}

async function init(client: Client) {
  const commands: SlashCommandBuilder[] = await loadCommands(client);
  await registerCommands(commands);
}

export default (client: Client) => {
  init(client);
};
