export default {
  '*.{js,mjs,cjs,ts,vue}': ['npm run eslint', 'npm run prettier'],
  '*.{less,css,vue,html}': ['npm run stylelint', 'npm run prettier'],
  '*.md, *.json': ['npm run prettier'],
};
