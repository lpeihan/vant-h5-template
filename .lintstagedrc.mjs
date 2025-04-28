export default {
  '*.{js,mjs,cjs,ts,vue}': ['npm run eslint', 'npm run prettier'],
  '*.{less,css,vue,html}': ['npm run stylelint', 'npm run prettier'],
  '*.{js,mjs,cjs,ts,vue,less,css,html}': ['npm run cspell'],
  '*.md, *.json': ['npm run prettier'],
};
