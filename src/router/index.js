import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入store模块
import Store from '@/store'
// 引入一级组件
import Login from '@/views/login'
import Home from '@/views/home'
// 引进二级组件
import Welcome from '@/views/welcome'
import Notfound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
// 注册路由
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/lg', name: 'login', component: Login },
    { path: '/',
      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish }
      ] },
    { path: '*', component: Notfound }
  ]
})
// 导出路由
// 创立路由守卫
router.beforeEach((to, from, next) => {
  if (!Store.getUser().token && to.path !== '/lg') {
    next('/lg')
  }
  next()
})
export default router
