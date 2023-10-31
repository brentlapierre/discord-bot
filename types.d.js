import {
  AutocompleteInteraction,
  Collection,
  CommandInteraction,
  InteractionCollector,
  SlashCommandBuilder,
} from 'discord.js';

export interface Command {
  command: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction | any) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
  cooldown?: number;
}

export interface Event {
  name: string;
  once?: boolean | false;
  execute: (...args?) => void;
}

export interface ComponentInteraction {
  name: string;
  execute: (interaction: InteractionCollector) => void;
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
    interactions: Collection<string, ComponentInteraction>;
    contextMenus: Collection<string, ContextMenu>;
  }
}


/* Mongodb Schemas */

export interface IGuild extends mongoose.Document {
  id: string;
  joinedAt: Date;
}
