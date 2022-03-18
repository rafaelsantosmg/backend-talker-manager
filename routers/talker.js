const express = require('express');
const readFile = require('../services/readFile');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/', (_req, res) => {
  const talkers = readFile('./talker.json');
  if (talkers.length !== 0) return res.status(HTTP_OK_STATUS).json(talkers);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;