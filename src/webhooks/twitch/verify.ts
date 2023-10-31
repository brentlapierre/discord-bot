import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

export function getHmacMessage(request: any): string {
  return (
    request.headers['twitch-eventsub-message-id'] +
    request.headers['twitch-eventsub-message-timestamp'] +
    JSON.stringify(request.body)
  );
}

export function getHmac(secret: string, message: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}

export function verifyMessage(hmac: string, verifySignature: any): boolean {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}
