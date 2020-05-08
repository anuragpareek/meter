import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Welcome to meter reading software, User postman colletion to test API till React app is not available');
});

export default router;
