import { showPopup } from './core';

export { showPopup };

export const showExamplePopup = () => {
  showPopup(require('./ExamplePopup.vue').default);
};
