import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ title: 'Welcome to meter reading software' });
});

export default router;
