import { ActivityType, Client } from 'discord.js';
import type { Event } from '../types.d.js';
import * as log from '../utils/log.js';

const event: Event = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    log.success(`Logged in as ${client.user?.tag}`);

    client.user?.setPresence({
      activities: [{
        type: ActivityType.Playing,
        name: '🎵 Music',
      }],
    });
  },
};

export default event;
