import {
  Client,
  Collection,
  GatewayIntentBits,
} from 'discord.js';
import { Command, ComponentInteraction } from './types.d.js';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { readdirSync } from 'fs';
import * as url from 'url';
import * as log from './utils/log.js';
import { disconnect } from './handlers/database.js';

dotenv.config();

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection<string, Command>();
client.interactions = new Collection<string, ComponentInteraction>();

const handlersDir = join(dirname, './handlers');

readdirSync(handlersDir).forEach(async (handler: any) => {
  if (!handler.endsWith('.js')) return;

  await import(`file://${handlersDir}/${handler}`)
    .then((module: any) => module.default(client));
});

client.login(process.env.DISCORD_TOKEN);

process.on('SIGINT', async () => {
  log.info('Shutting down...');

  await disconnect(); // Disconnects from the database
  client.destroy(); // Destroys the client

  process.exit();
});
