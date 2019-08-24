import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入一级组件
import Login from '@/views/login'
import Home from '@/views/home'
// 引进二级组件
import Welcome from '@/views/welcome'
import Notfound from '@/views/404'
// 注册路由
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/lg', name: 'login', component: Login },
    { path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/wc', name: 'welcome', component: Welcome }
      ] },
    { path: '*', component: Notfound }
  ]
})
// 导出路由
export default router
