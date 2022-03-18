const fs = require('fs');

const readFile = (file) => {
  try {
    const fileContext = fs.readFileSync(file);
    const data = JSON.parse(fileContext);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = readFile;