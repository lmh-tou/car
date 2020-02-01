// 路由跳转，可以先不看他
import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'

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
    }
  ]
})
