import Vue from 'vue';
// import 'bulma';
// import 'font-awesome';

import App from './App';
import router from './router';
import store from './store';
import filters from './filters';

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
