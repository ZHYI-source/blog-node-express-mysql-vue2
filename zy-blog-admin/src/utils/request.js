import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // api的base_url  //请求页面数据地址
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000 // request timeout
})
//把数据对象序列化成 json字符串
service.defaults.transformRequest = data => JSON.stringify(data);

// 请求拦截器
service.interceptors.request.use(function (config) {
  if (store.getters.token) {
    config.headers['x-access-token'] = getToken()
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log('err' + error) // for debug
  // this.$router.push('/login')
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error);
})


// response interceptor
// service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
//   response => {
//     const res = response.data
//
//     if (res.errno === 501) {
//       MessageBox.alert('系统未登录，请重新登录', '错误', {
//         confirmButtonText: '确定',
//         type: 'error'
//       }).then(() => {
//         store.dispatch('user/FedLogOut').then(() => {
//           location.reload()
//         })
//       })
//       return Promise.reject('error')
//     } else if (res.errno === 502) {
//       MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
//         confirmButtonText: '确定',
//         type: 'error'
//       })
//       return Promise.reject('error')
//     } else if (res.errno === 503) {
//       MessageBox.alert('请求业务目前未支持', '警告', {
//         confirmButtonText: '确定',
//         type: 'error'
//       })
//       return Promise.reject('error')
//     } else if (res.errno === 504) {
//       MessageBox.alert('更新数据已经失效，请刷新页面重新操作', '警告', {
//         confirmButtonText: '确定',
//         type: 'error'
//       })
//       return Promise.reject('error')
//     } else if (res.errno === 505) {
//       MessageBox.alert('更新失败，请再尝试一次', '警告', {
//         confirmButtonText: '确定',
//         type: 'error'
//       })
//       return Promise.reject('error')
//     } else if (res.errno === 506) {
//       MessageBox.alert('没有操作权限，请联系管理员授权', '错误', {
//         confirmButtonText: '确定',
//         type: 'error'
//       })
//       return Promise.reject('error')
//     } else if (res.errno !== 0) {
//       // 非5xx的错误属于业务错误，留给具体页面处理
//       return Promise.reject(response)
//     } else {
//       return response
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     // this.$router.push('/login')
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
