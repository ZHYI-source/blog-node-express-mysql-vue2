import axios from 'axios'
import {getToken,removeToken} from '@/utils/auth'
import store from '@/store'
import {Message, MessageBox} from "element-ui";
import router,{ resetRouter } from '../router'


const _token = getToken()

const config = {
  // baseURL: '',
  // 时间短了 先关闭掉
  // timeout: 2000,
  // 是否是跨域请求
  withCredentials: true,
  headers: {
    // 'z-car': '970864818235088898',
    // 'x-access-token': _token,
    // 'z-car': '931089816493383682',
    // 'x-access-token': _token,
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // transformRequest: [function (data) {
  //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //   data = Qs.stringify(data);
  //   return data;
  // }],
  // 返回数据类型
  responseType: 'json'
}
const AxiosInst = axios.create(config)
// 请求拦截器
AxiosInst.interceptors.request.use((config) => {
  // if (config.method === 'post') {
  //   //如果是post方式，则使用json方式处理
  //   config.headers = {'Content-Type': 'application/json;charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest'};
  // };
  if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['x-access-token'] = getToken()
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
AxiosInst.interceptors.response.use(response => {
  // 检查数据是否返回NULL
  // if (response.data === null) {
  //   return Promise.reject(response)
  // }
  const res = response.data

  if (res.errno === 501) {
    MessageBox.alert('系统未登录，请重新登录', '错误', {
      confirmButtonText: '确定',
      type: 'error'
    }).then(() => {
      store.dispatch('user/FedLogOut').then(() => {
        location.reload()
      })
    })
    // return Promise.reject('error')
    return;
  // }else if (res.errno === 502) {
  //   MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
  //     confirmButtonText: '确定',
  //     type: 'error'
  //   })
  //   return Promise.reject('error')
  // } else if (res.errno === 503) {
  //   MessageBox.alert('请求业务目前未支持', '警告', {
  //     confirmButtonText: '确定',
  //     type: 'error'
  //   })
  //   return Promise.reject('error')
  // } else if (res.errno === 504) {
  //   MessageBox.alert('更新数据已经失效，请刷新页面重新操作', '警告', {
  //     confirmButtonText: '确定',
  //     type: 'error'
  //   })
  //   return Promise.reject('error')
  // } else if (res.errno === 505) {
  //   MessageBox.alert('更新失败，请再尝试一次', '警告', {
  //     confirmButtonText: '确定',
  //     type: 'error'
  //   })
  //   return Promise.reject('error')
  } else if (res.errno === 506) {
    MessageBox.alert('系统未登录，请重新登录', '错误', {
      confirmButtonText: '确定',
      type: 'error'
    })
    removeToken()
    resetRouter()
    router.push({path:'/login'})
  //   return Promise.reject('error')
  } else {
    console.log('response')
    console.log(response)
    return response
  }
  // else if (res.errno !== 0) {
  //   // 非5xx的错误属于业务错误，留给具体页面处理
  //   return Promise.reject(response)
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
