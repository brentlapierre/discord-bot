import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as log from '../utils/log.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.listen(process.env.WEBHOOK_PORT, () => {
  log.info(`🚀 Listening for webhook events on port ${process.env.WEBHOOK_PORT}`);
});

app.post('/hook/twitch', (req, res) => {
  console.log(req.body);

  res.status(200).send();
});
