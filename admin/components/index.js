import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

export default (app) => {
  app.component('SvgIcon', SvgIcon);
  app.component('Icon', Icon);
};
