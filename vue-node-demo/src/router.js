import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Register from './pages/register.vue'
import Sale from './pages/sale'
import SaleManage from './pages/saleManage'
import Upload from './pages/unload'
import Admin from './pages/admin'
import SaleTable from './pages/saleTable'


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
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale
    },
    {
      path: '/saleManage',
      name: 'saleManage',
      component: SaleManage
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/saleTable',
      name: 'saleTable',
      component: SaleTable
    }
  ]
})
