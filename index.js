const express = require('express');
const bodyParser = require('body-parser');

const routerTalker = require('./routers/talker');
const routerLogin = require('./routers/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/login', routerLogin);
app.use('/talker', routerTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
