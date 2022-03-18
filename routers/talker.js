const express = require('express');
const readFile = require('../services/readFile');
const writeFile = require('../services/writeFile');
const validToken = require('../middleware/validToken');
const validAge = require('../middleware/validAge');
const validName = require('../middleware/validName');
const validTalk = require('../middleware/validTalk');

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

router.post('/', validToken, validName, validAge, validTalk, (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = readFile('./talker.json');
  talkers.push({ name, age, id: talkers.length + 1, talk });
  writeFile('./talker.json', talkers);
  return res.status(201).json({ name, age, id: talkers.length, talk });
});

module.exports = router;