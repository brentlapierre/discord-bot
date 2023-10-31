import mongoose from 'mongoose';
import * as log from '../utils/log.js';

export default async function connect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/?retryWrites=true&w=majority`)
    .then(() => log.success('📚 Successfully connected to the database!'))
    .catch((err) => log.error(`Failed to connect to the database: ${err}`));
}

export async function disconnect() {
  await mongoose.disconnect()
    .then(() => log.info('Successfully disconnected from the database!'))
    .catch((err) => log.error(`Failed to disconnect from the database: ${err}`));
}
