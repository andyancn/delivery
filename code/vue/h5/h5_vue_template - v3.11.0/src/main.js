import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import {
  Popup,
  Picker,
  Field,
  Image,
  Area,
  Cell,
  CellGroup,
  Toast,
  NavBar,
  Tabbar,
  TabbarItem,
  Form,
  Button,
  PullRefresh,
  List,
  Search,
  RadioGroup,
  Radio,
  Tab,
  Tabs,
  Dialog,
  Checkbox,
  DatetimePicker,
  Stepper,
  DropdownMenu,
  DropdownItem
} from 'vant';
import 'vant/lib/index.css';
import './assets/css/theme.less';
import './assets/iconfonts/iconfont.css';
import './assets/css/common.css';
import 'lib-flexible/flexible';
import WxMpInit from './api/wxMpInit.js';
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'});
Vue.prototype.APP_NAME = 'YFZ_H5_SALE';
Vue.prototype.WxMpInit = WxMpInit;
Vue.token = 'abcABC123456';
Vue.config.productionTip = false;

Vue.use(Popup).use(Picker).use(Field).use(Image).use(Area).use(Cell).use(CellGroup).use(Toast).use(NavBar).use(Tab).use(Tabs).use(Checkbox)
  .use(Tabbar).use(TabbarItem).use(Form).use(Button).use(PullRefresh).use(List).use(Search).use(RadioGroup).use(Radio).use(Dialog).use(DatetimePicker).use(Stepper).use(DropdownMenu).use(DropdownItem);
// Vue.use(Lazyload, {
//     lazyComponent: true,
//     loading: require("./assets/")
// });

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.content = to.meta.content;
    head[0].appendChild(meta);
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


