import { Client } from 'discord.js';
import { promises } from 'fs';
const { readdir } = promises;
import { join, relative } from 'path';
import type { ComponentInteraction } from '../types.d.js';
import * as url from 'url';
import { getDirectories } from '../utils/file.js';
import * as log from '../utils/log.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default async (client: Client) => {
  const interactions: string[] = [];
  const interactionsDir = join(dirname, '../interactions');
  const directories: string[] = getDirectories(interactionsDir);

  await Promise.all(
    directories.map(async (directory: string) => {
      const files: string[] = await readdir(directory);

      await Promise.all(
        files.map(async (file: string) => {
          if (!file.endsWith('.js')) return;

          const relativePath: string = relative(interactionsDir, directory);

          const interaction: ComponentInteraction = 
            await import(`file://${interactionsDir}/${relativePath}/${file}`).then(m => m.default);
          client.interactions.set(interaction.name, interaction);
          interactions.push(interaction.name);
        }),
      ).catch(err => log.error(`Failed to load interactions: ${err}`));
    }),
  );

  log.info(`🤝 Successfully loaded ${interactions.length} interactions.`);
};
