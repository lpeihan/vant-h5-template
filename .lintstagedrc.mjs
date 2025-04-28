export default {
  '*.{js,mjs,cjs,ts,vue}': ['npm run eslint', 'npm run prettier'],
  '*.{less,css,vue}': ['npm run stylelint', 'npm run prettier'],
  '*.{js,mjs,cjs,ts,vue,less,css}': ['npm run cspell'],
};
