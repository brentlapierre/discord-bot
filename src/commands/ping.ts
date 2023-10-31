import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.d.js';

const command: Command = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: interaction => {
    interaction.reply({
      content: 'Pong!',
      ephemeral: true,
    });
  },
  cooldown: 10,
};

export default command;
