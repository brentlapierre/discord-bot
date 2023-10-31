import { Interaction } from 'discord.js';
import type { Event } from '../types.d.js';

const event: Event = {
  name: 'interactionCreate',
  execute: (interaction: Interaction) => {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;
      command.execute(interaction);
    }

    if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
      const component = interaction.client.interactions.get(interaction.customId);

      if (!component) return;
      component.execute(interaction);
    }
  },
};

export default event;
