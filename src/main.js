// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'bulma/bulma.sass';
import 'font-awesome/scss/font-awesome.scss';

import App from './App';
import router from './router';
import store from './store';
import filters from './filters';


Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  ...App,
}).$mount('#app');
