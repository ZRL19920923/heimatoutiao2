import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入一级组件
import Login from '@/views/login'
// 注册路由
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/lg', name: 'login', component: Login }
  ]
})
// 导出路由
export default router
