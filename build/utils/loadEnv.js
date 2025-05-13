const fs = require('fs');

const dotenv = require('dotenv');

const paths = require('./paths');

function loadEnv(mode) {
  const envFiles = ['.env.test'];

  envFiles.push(`.env.${mode}`);

  envFiles.forEach((file) => {
    const fullPath = paths.resolve(file);

    if (fs.existsSync(fullPath)) {
      dotenv.config({ path: fullPath });
    }
  });
}

module.exports = loadEnv;
