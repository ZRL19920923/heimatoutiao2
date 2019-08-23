import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入elementui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.config.productionTip = false
// 注册插件
Vue.use(ElementUI)

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
