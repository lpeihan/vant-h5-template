const fs = require('fs');

const dotenv = require('dotenv');

const paths = require('./paths');

function loadEnv(env) {
  const envFiles = ['.env.test'];

  envFiles.push(`.env.${env}`);

  envFiles.forEach((file) => {
    const fullPath = paths.resolve(file);

    if (fs.existsSync(fullPath)) {
      dotenv.config({ path: fullPath });
    }
  });
}

module.exports = loadEnv;
