import Vue from 'vue';
import Router from 'vue-router';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Welcome from '../components/Welcome';
import NotFound from '../components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/auth', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Welcome },
    { path: '*', component: NotFound }
  ]
});
