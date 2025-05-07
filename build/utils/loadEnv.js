const fs = require('fs');

const dotenv = require('dotenv');

const paths = require('./paths');

function loadEnv(mode = 'local') {
  const envFiles = [];

  if (mode === 'local') {
    envFiles.push('.env.local');
  } else {
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
