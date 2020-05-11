import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Register from './pages/register.vue'
import Sale from './pages/sale'
import SaleManage from './pages/saleManage'
import Upload from './pages/unload'
import Admin from './pages/admin'
import SaleTable from './pages/saleTable'
import SaleCar from './pages/saleCar'
import OrderManage from './pages/orderManage'
import ReturnCar from './pages/returnCar'
import UserTable from './pages/userTable'
import User from './pages/user'
import UserManage from './pages/userManage'
import Look from './pages/look'
import Details from './pages/details'
import Guess from './pages/guess'
import MyOrder from './pages/myOrder'

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
    },
    {
      path: '/saleCar',
      name: 'saleCar',
      component: SaleCar
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: OrderManage
    },
    {
      path: '/returnCar',
      name: 'returnCar',
      component: ReturnCar
    },
    {
      path: '/userTable',
      name: 'userTable',
      component: UserTable
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: UserManage
    },
    {
      path: '/look',
      name: 'look',
      component: Look
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/guess',
      name: 'guess',
      component: Guess
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: MyOrder
    }
  ]
})
