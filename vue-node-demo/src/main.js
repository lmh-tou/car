<<<<<<< HEAD
=======
// 此文件夹用来创建vue实例，相当于vue的初始化不用管它
>>>>>>> a059bf0dba06de67116b58eae105fb00c2178a76
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import less from 'less'
<<<<<<< HEAD
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import axios from './util/interceptor.js'
Vue.prototype.$http = axios;

Vue.use(ElementUI)
=======

>>>>>>> a059bf0dba06de67116b58eae105fb00c2178a76
Vue.config.productionTip = false

Vue.use(less)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
<<<<<<< HEAD

=======
>>>>>>> a059bf0dba06de67116b58eae105fb00c2178a76
