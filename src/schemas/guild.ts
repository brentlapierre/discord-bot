import { Schema, model } from 'mongoose';
import { IGuild } from '../types.d.js';

const GuildSchema = new Schema<IGuild>({
  id: {
    required: true,
    type: String,
  },
  joinedAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

const GuildModel = model('guild', GuildSchema);

export default GuildModel;
