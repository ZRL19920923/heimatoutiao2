// 配置axios全局
import axios from 'axios'
import Store from '@/store'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers.AUthorization = `Bearer ${Store.getUser().token}`

// 现象: 登录时 跳转首页 main.js导入所有代码 首页响应
// 但是当首页中还有其他请求则此次请求会报错 因为这次token还没被存储
// 解决方法: 在每次请求头上设置token即可  这里就要用到请求拦截器 每一次请求之前被拦截下来设置token
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${Store.getUser().token}`
//   return config
// }, err => {
//   return Promise.reject(err)
// })
// // 因为后端的token或过期 所以每次响应的时候要检查响应代码 若响应状态为401那么删除
// // 过期token 并且跳转登录页面重新登录 这里用到响应拦截器
// axios.interceptors.response.use(res => res, err => {
//   if (err.response.status === 401) {
//     Store.delUser()
//     router.push('/lg')
//   }
//   return Promise.reject(err)
// })
axios.interceptors.request.use(function (config) {
  // 参数 config 请求配置  默认配置
  // 修改配置  添加 token 信息
  // 返回修改好的配置  请求的时候使用你的修改后的配置
  config.headers.AUthorization = `Bearer ${Store.getUser().token}`
  return config
}, function (error) {
  // error 错误对象
  // 对请求错误做些什么
  // 返回一个一定出错的promise对象
  // new Promise((resolve,reject)=>{})  可能成功可能失败
  // Promise.reject(error) 一定是调catch() 失败
  // Promise.resolve() 一定是调then() 成功
  return Promise.reject(error)
})
// 因为服务器返回的token有有效期 所以响应回来的时候 应该判断当下的token是否过期  也就是判断返回的状态码
// 是否为401

// 添加响应拦截器(每次后端给你响应)
axios.interceptors.response.use(function (response) {
  // 响应成功 直接返回数据即可
  // 对响应数据做点什么
  return response
}, function (error) {
  // 响应失败
  // 401错误  获取响应状态码 判断是不是401
  if (error.response.status === 401) {
    // 如果是401 要求返回login页面重新登录 并且删除失效的token
    // 借用到router.push()所以这里要引入router
    Store.delUser()
    router.push('/lg')
  }
  // error.response  响应对象
  // error.response.status 状态码
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
