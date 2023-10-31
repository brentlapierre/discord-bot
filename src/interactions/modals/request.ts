import { EmbedBuilder } from 'discord.js';
import type { ComponentInteraction } from '../../types.js';

const modal: ComponentInteraction = {
  name: 'request',
  execute: interaction => {
    const resEmbed = new EmbedBuilder()
      .setColor(0xd669fa)
      .addFields({ name: 'Modal', value: 'Interacted' });
    interaction.reply({ embeds: [resEmbed] });
  },
};

export default modal;
