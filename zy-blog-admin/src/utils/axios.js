import axios from 'axios'
import {getToken, removeToken} from '@/utils/auth'
import store from '@/store'
import {Message, MessageBox} from "element-ui";
import router, {resetRouter} from '../router'


const _token = getToken()

const config = {
  baseURL: 'http://114.117.164.181:5220',
  // 时间短了 先关闭掉
  // timeout: 2000,
  // 是否是跨域请求
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 返回数据类型
  responseType: 'json'
}
const AxiosInst = axios.create(config)
// 请求拦截器
AxiosInst.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers['x-access-token'] = getToken()
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
AxiosInst.interceptors.response.use(response => {
  // const res = response.data
  //
  // if (res.errno === 501) {
  //   MessageBox.alert('系统未登录，请重新登录', '错误', {
  //     confirmButtonText: '确定',
  //     type: 'error'
  //   }).then(() => {
  //     store.dispatch('user/FedLogOut').then(() => {
  //       location.reload()
  //     })
  //   })
  //   // return Promise.reject('error')
  //   return;
  //
  // } else if (res.errno === 506) {
  //   MessageBox.alert('系统未登录，请重新登录', '错误', {
  //     confirmButtonText: '确定',
  //     type: 'error'
  //   })
  //   removeToken()
  //   resetRouter()
  //   router.push({path: '/login'})
  //   //   return Promise.reject('error')
  // } else {
  //   console.log('response')
  //   console.log(response)
    return response
  // }
}, (error) => {
  // 请求错误时做些事
  console.log('err' + error) // for debug
  // this.$router.push('/login')
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})
export default AxiosInst
