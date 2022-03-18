const fs = require('fs');

const writeFile = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data));
    console.log('Arquivo escrito com sucesso!');
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
};

module.exports = writeFile;