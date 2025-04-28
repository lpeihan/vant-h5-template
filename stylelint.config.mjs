export default {
  extends: [
    'stylelint-config-standard-less',
    'stylelint-config-recess-order',
    'stylelint-config-standard-vue',
  ],
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'public/**/*'],
};
