const fs = require('fs');

const dotenv = require('dotenv');

const paths = require('./paths');

function loadEnv(mode) {
  const envFiles = ['.env'];

  if (mode === 'prod') {
    envFiles.push('.env.production');
  }

  envFiles.forEach((file) => {
    const fullPath = paths.resolve(file);

    if (fs.existsSync(fullPath)) {
      dotenv.config({ path: fullPath });
    }
  });
}

module.exports = loadEnv;
