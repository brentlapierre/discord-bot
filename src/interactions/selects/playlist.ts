import { EmbedBuilder } from 'discord.js';
import type { ComponentInteraction } from '../../types.js';

const select: ComponentInteraction = {
  name: 'playlist',
  execute: interaction => {
    const resEmbed = new EmbedBuilder()
      .setColor(0xd669fa)
      .addFields({ name: '🎧 Now playing:', value: interaction.values[0] });
    interaction.reply({ embeds: [resEmbed] });
  },
};

export default select;
