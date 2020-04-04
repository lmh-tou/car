import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Register from './pages/register.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register

    }
  ]
})
