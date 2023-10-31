import { Guild } from 'discord.js';
import type { Event } from '../types.d.js';
import GuildModel from '../schemas/guild.js';
import * as log from '../utils/log.js';

const event: Event = {
  name: 'guildCreate',
  execute: async (guild: Guild) => {
    const newGuild = new GuildModel({
      id: guild.id,
      joinedAt: new Date(),
    });

    await newGuild.save()
      .then(() => log.info(`Saved guild ${guild.id} to the database.`))
      .catch((err) => log.error(`Failed to save guild ${guild.id} to the database: ${err}`));
  },
};

export default event;
