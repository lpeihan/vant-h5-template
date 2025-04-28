export default {
  '*.{js,mjs,cjs,ts,vue}': ['npm run eslint', 'npm run prettier', 'git add'],
  '*.{less,css,vue,html}': ['npm run stylelint', 'npm run prettier', 'git add'],
  '*.{js,mjs,cjs,ts,vue,less,css,html}': ['npm run cspell', 'git add'],
  //   '*.md, *.json': ['npm run prettier', 'git add'],
};
