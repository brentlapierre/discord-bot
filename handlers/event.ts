import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import type { Event } from '../types.d.js';
import * as url from 'url';
import * as log from '../utils/log.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (client: Client) => {
  const eventsDir = join(dirname, '../events');
  const events: number = readdirSync(eventsDir).filter(file => file.endsWith('.js')).length;

  readdirSync(eventsDir).forEach(async file => {
    if (!file.endsWith('.js')) return;

    const event: Event = await import(`file://${eventsDir}/${file}`).then(m => m.default);

    /* eslint-disable */
    event.once ?
      client.once(event.name, (...args) => event.execute(...args))
      :
      client.on(event.name, (...args) => event.execute(...args));
  });

  log.info(`🎉 Successfully loaded ${events} events.`);
};
