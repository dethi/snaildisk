import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/Login';
import Hello from '../components/Hello';
import Welcome from '../components/Welcome';
import NotFound from '../components/NotFound';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/auth', component: Login },
    { path: '/dashboard', component: Hello },
    { path: '/', component: Welcome },
    { path: '*', component: NotFound },
  ],
});

export default router;
