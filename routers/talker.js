const express = require('express');
const readFile = require('../services/readFile');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/', (_req, res) => {
  const talkers = readFile('./talker.json');
  if (talkers.length !== 0) return res.status(HTTP_OK_STATUS).json(talkers);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = readFile('./talker.json');
  const findTalker = talkers.find((talker) => talker.id === Number(id));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

module.exports = router;