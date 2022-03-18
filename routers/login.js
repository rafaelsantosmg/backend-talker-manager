const express = require('express');
const validEmail = require('../middleware/validEmail');
const validPassword = require('../middleware/validPassword');
const generateToken = require('../services/token');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.post('/', validEmail, validPassword, (_req, res) => {
  const token = generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;