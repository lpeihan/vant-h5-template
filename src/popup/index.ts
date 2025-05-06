import { showPopup } from './core';

export { showPopup };

export const showTransferPopup = () => {
  showPopup(require('./TransferPopup.vue').default);
};

export const showMiningPopup = (props) => {
  showPopup(require('./MiningPopup.vue').default, props);
};
