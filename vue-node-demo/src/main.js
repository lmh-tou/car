// 此文件夹用来创建vue实例，相当于vue的初始化不用管它
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import less from 'less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'


import axios from './util/interceptor.js'
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.use(less)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


