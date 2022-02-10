import methodMap from '@/libs/methodMap'
import AxiosInst from './axios'

class Http {
}

/**
 * 注册VUE插件
 * @param Vue
 */
Http.install = function(Vue) {
  /**
   * 全局请求接口
   * @param method 方法
   * @param opts 参数
   * @param toast 是否提示
   * @returns {string}
   */
  Vue.prototype.request = function(method, opts, params, toast) {
    // 如果有给 toast 参数则显示 loading 加载数据
    if (toast && typeof (toast) === 'boolean') {
      Vue.prototype.$dialog.loading.open('加载中')
    } else if (toast && typeof (toast) === 'string') {
      Vue.prototype.$dialog.loading.open(toast)
    }
    const m = methodMap[method]
    if (m) {
      const optsType = typeof (opts)
      if (optsType === null || optsType !== 'object') {
        opts = {}
      }
      if (typeof m.method === 'undefined') {
        console.log('method 错误', '缺少请求 method 方法', '\n')
        return false
      }
      if (m.method === 'get') {
        return Vue.prototype.apiGet(m.url, opts)
      } else if (m.method === 'post') {
        return Vue.prototype.apiPost(m.url, opts, params)
      } else {
        return false
      }
    } else {
      closeLoading()
      console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n')
    }
  }
  /**
   * POST 请求 无提示
   * @param url 请求URL
   * @param data 请求数据
   * @returns {Promise}
   */
  Vue.prototype.apiPost = function(url, data, params, toast = false) {
    if (toast && typeof (toast) === 'boolean') {
      Vue.prototype.$dialog.loading.open('很快加载好了')
    } else if (toast && typeof (toast) === 'string') {
      Vue.prototype.$dialog.loading.open(toast)
    }
    return new Promise((resolve, reject) => {
      AxiosInst.post(url, data, {
        params: params
      }).then((response) => {
        console.log('success')
        console.log(response)
        setTimeout(() => closeLoading(), 800)
        resolve(response.data)
      }).catch((error) => {
        console.log('fail')
        console.log(error)
        closeLoading()
        reject(error)
      })
    })
  }
  /**
   * GET 请求 无提示
   * @param url 请求URL
   * @param data 请求数据
   * @returns {Promise}
   */
  Vue.prototype.apiGet = function(url, data, toast = false) {
    if (toast && typeof (toast) === 'boolean') {
      Vue.prototype.$dialog.loading.open('很快加载好了')
    } else if (toast && typeof (toast) === 'string') {
      Vue.prototype.$dialog.loading.open(toast)
    }
    return new Promise((resolve, reject) => {
      AxiosInst.get(url, {
        params: data
      }).then((response) => {
        setTimeout(() => closeLoading(), 800)
        resolve(response.data)
      }).catch((error) => {
        closeLoading()
        reject(error)
      })
    })
  }
  /**
   * 关闭方法
   */
  function closeLoading() {
    // Vue.prototype.$dialog.loading.close();
  }
}
export default Http
