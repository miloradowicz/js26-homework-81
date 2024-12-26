import express from 'express';
import cors from 'cors';
import Link from './models/Link';
import mongoose from 'mongoose';
import { getRandomString } from './utils/utils';
import { config } from './config';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/:shortUrl', async (req, res, next) => {
  try {
    const link = await Link.findOne({ shortUrl: req.params.shortUrl });
    if (link) {
      res.status(301).redirect(link.originalUrl);
    } else {
      res.status(404).send({ error: 'Link not found.' });
    }
  } catch (e) {
    next(e);
  }
});

app.post('/links', async (req, res, next) => {
  if (!req.body.originalUrl) {
    res.status(400).send({ error: 'Original url is required.' });
    return;
  }

  try {
    let shortUrl = '';
    let success = false;
    let c = 0;
    while (!success && c < config.shortUrlMaxAttempts) {
      shortUrl = getRandomString(config.shortUrlLength);
      if (await Link.findOne({ shortUrl })) {
        shortUrl = getRandomString(config.shortUrlLength);
        c++;
      } else {
        success = true;
      }
    }

    if (!success) {
      res.status(408).send('Failed to create short url.');
      return;
    }

    const body = {
      shortUrl,
      originalUrl: req.body.originalUrl,
    };

    const link = new Link(body);

    res.send(await link.save());
  } catch (e) {
    next(e);
  }
});

(async () => {
  await mongoose.connect('mongodb://localhost/miloradowicz-hw81');

  await Link.init();

  app.listen(config.express.port, () => {
    console.log(`Server listenning on http://localhost:${config.express.port}/`);
  });
})();
