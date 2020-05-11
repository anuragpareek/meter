import express from 'express';

import { load, fetch } from '../meterReadingService';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const readingData = await fetch({...req.query});
  res.status(200).send(readingData);
});

router.get('/load', async (req, res, next) => {
  await load();
  res.status(200).send('success');
});

router.get('/:meterId', async (req, res, next) => {
  const {data} = await fetch({ meterId: req.params.meterId });
  res.status(200).send(data);
});

router.post('/', async (req, res, next) => {
  const readingData = await fetch({...req.body, ...req.query});
  res.status(200).send(readingData);
});

export default router;
