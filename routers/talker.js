const express = require('express');
const readFile = require('../services/readFile');
const writeFile = require('../services/writeFile');
const validToken = require('../middleware/validToken');
const validAge = require('../middleware/validAge');
const validName = require('../middleware/validName');
const validTalk = require('../middleware/validTalk');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const FILE_TALKER = './talker.json';

router.get('/', (_req, res) => {
  const talkers = readFile(FILE_TALKER);
  if (talkers.length !== 0) return res.status(HTTP_OK_STATUS).json(talkers);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = readFile(FILE_TALKER);
  const findTalker = talkers.find((talker) => talker.id === Number(id));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

router.delete('/:id', validToken, (req, res) => {
  const { id } = req.params;
  const talkers = readFile(FILE_TALKER);
  const filterTalk = talkers.filter((talk) => talk.id !== Number(id));
  writeFile(FILE_TALKER, filterTalk);
  return res.status(204).json();
});

router.use(validToken, validName, validAge, validTalk);

router.post('/', (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = readFile(FILE_TALKER);
  talkers.push({ name, age, id: talkers.length + 1, talk });
  writeFile(FILE_TALKER, talkers);
  return res.status(201).json({ name, age, id: talkers.length, talk });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = readFile(FILE_TALKER);
  const indexTalk = talkers.findIndex((tal) => tal.id === Number(id));
  talkers[indexTalk] = { name, age, id: Number(id), talk };
  writeFile(FILE_TALKER, talkers);
  return res.status(HTTP_OK_STATUS).json({ name, age, id: Number(id), talk });
});

module.exports = router;