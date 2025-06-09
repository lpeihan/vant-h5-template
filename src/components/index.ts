export * from './loading';

import BottomBar from './bottomBar/BottomBar.vue';
import InfiniteLoading from './infiniteLoading/InfiniteLoading.vue';
import SvgIcon from './svgIcon/SvgIcon.vue';
import TopBar from './topBar/TopBar.vue';

export default (app) => {
  app.component('BottomBar', BottomBar);
  app.component('InfiniteLoading', InfiniteLoading);
  app.component('SvgIcon', SvgIcon);
  app.component('TopBar', TopBar);
};
