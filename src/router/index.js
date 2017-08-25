import Vue from 'vue';
import Router from 'vue-router';

import Login from '../components/Login';
import Welcome from '../components/Welcome';

const Dashboard = () => import('../components/Dashboard');
const NotFound = () => import('../components/NotFound');

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
