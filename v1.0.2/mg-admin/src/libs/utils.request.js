import axios from 'axios'
import {get} from "lodash";
import util from "@/libs/util";
import {errorCreate, errorLog} from "@/api/tools";

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})


// 请求拦截
service.interceptors.request.use(
  config => {
    const token = util.cookies.get('token')
    config.headers = {
      authorization: token,
      'Content-Type': get(config, 'headers.Content-Type', 'application/json')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    errorLog(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {

    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data

    // 这个状态码是和后端约定的
    const {status} = dataAxios.meta
    if (status === undefined) {
      // 如果没有 status 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 status 代表这是一个后端接口 可以进行进一步的判断
      switch (status) {
        case 200:
          // [ 示例 ] status === 200 代表没有错误
          return dataAxios
        case 605:
          // [ 示例 ] status === 605 请求错误
          errorCreate(`[ code: 605 ] ${dataAxios.meta.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`错误： ${dataAxios.meta.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    //服务器错误处理
    const status = get(error, 'response.status')
    switch (status) {
      case 400:
        error.message = '请求错误';
        break
      case 401:
        error.message = '未授权，请登录';
        break
      case 403:
        error.message = '拒绝访问';
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`;
        break
      case 408:
        error.message = '请求超时';
        break
      case 500:
        error.message = '服务器内部错误';
        break
      case 501:
        error.message = '服务未实现';
        break
      case 502:
        error.message = '网关错误';
        break
      case 503:
        error.message = '服务不可用';
        break
      case 504:
        error.message = '网关超时';
        break
      case 505:
        error.message = 'HTTP版本不受支持';
        break
      default:
        break
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
