/* eslint-disable spaced-comment */
import methodMap from './methodMap';
import axios from 'axios';
import store from '@/store'
import {getToken, removeToken} from '@/utils/auth'
import {Message, MessageBox} from "element-ui";
import router,{ resetRouter } from '../router'

class Http {
}

function creatDownLoad(fileName, res) {
    const content = res;
    const blob = new Blob([content]);
    // const fileName = '导出信息.xlsx';
    if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);// 释放URL 对象
        document.body.removeChild(elink);
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName);
    }
}

/**
 * 注册VUE插件
 * @param Vue
 */
Http.install = function (Vue) {
    const config = {
        // 是否是跨域请求
        withCredentials: true,
        //返回数据类型
        responseType: 'json'
    };
    const AxiosInst = axios.create(config);
    // let loading=null;
    // let openLoading = function () {
    //     Vue.prototype.openLoading();
    //     // app.openLoading();
    // };
    // let loadingClose = function () {
    //     Vue.prototype.closeLoading();
    //     // app.closeLoading();
    // };
//请求拦截器
    AxiosInst.interceptors.request.use((config) => {
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        };
        let token = getToken();
        // console.log('token:'+ token)
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    }, (err) => {
        console.log('请求前错误异常');
        return Promise.reject(err);
    });
//响应拦截器
    AxiosInst.interceptors.response.use(response => {
        //检查数据是否返回NULL
        let headers = response.headers;

        // console.log('响应拦截器')
        // console.log(response)

        //判断是否是下载文件方式
        let contentType = headers['content-type'];
        if (contentType !== undefined && contentType !== null && (contentType.indexOf('application/vnd.ms-excel') !== -1
            || contentType.indexOf('application/octet-stream') !== -1)) {
            let fileName = headers['content-disposition'];
            fileName = decodeURIComponent(fileName.substr(fileName.indexOf("=") + 1));
            //创建下载
            console.log(response.data);
            creatDownLoad(fileName, response.data);
            return Promise.reject({});
        }


        return response;
    }, (error) => {
        console.log('异常！！！！！！！')
      // console.log(JSON.stringify(error))
      console.log(error)

        return Promise.reject(error.response.data);
    });
    Vue.prototype.getSessionStorage = (key) => {
        let kv = sessionStorage.getItem(key);
        if (kv === null || kv === '' || kv === undefined) {
            //读取cookie
            var cookies = document.cookie;
            var list = cookies.split(";");          // 解析出名/值对列表
            for (var i = 0; i < list.length; i++) {
                var arr = list[i].split("=");          // 解析出名和值
                if (arr[0] == key)
                    kv = decodeURIComponent(arr[1]);   // 对cookie值解码
            }
        }
        return kv;
    };
    Vue.prototype.checkWebKit = () => {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('MicroMessenger') !== -1) {
            return 2;
        } else if (userAgent.indexOf('AlipayClient') !== -1) {
            return 1;
        } else if (userAgent.indexOf('Bestpay') !== -1) {//翼支付
            return 3;
        }
        return 0;
    };
    /**
     * 获取地址请求参数
     * @returns {{}}
     */
    Vue.prototype.getRequestParam = () => {
        let map = {};
        let params = window.location.search;
        let str = params.substr(1);
        let strs = str.split('&');

        if (strs && strs.length > 0) {
            for (let i in strs) {
                let strss = strs[i].split('=');
                map[strss[0]] = strss[1];
            }
        }
        return map;
    };
    /**
     * 获取当前地址域
     * @param flg true获取全路径 false 获取域名地址
     * @returns {string}
     */

    Vue.prototype.getHTTP = (flg) => {
        if (flg) {
            return window.location.href;
        }
        let http = window.location.protocol + "//" + window.location.host;
        return http;
    };
    /**
     * 全局请求接口
     * @param method 方法
     * @param opts 参数
     * @returns {string}
     */
    Vue.prototype.request = function (method, opts, params) {
      console.log('request')
        // openLoading();
        let m = methodMap[method];
        if (m) {
            let optsType = typeof (opts);
            if (optsType === null || optsType !== 'object') {
                opts = {};
            }
            let responseType = m.responseType;
            // responseType: 'blob'
            if (typeof m.method === 'undefined') {
                console.log('method 错误:缺少请求 method 方法');
                // loadingClose();
                return false;
            }
            if (m.method === 'get') {
                return Vue.prototype.apiGet(m.url, opts, responseType);
            } else if (m.method === 'post') {
                return Vue.prototype.apiPost(m.url, opts, params, responseType);
            } else {
                // loadingClose();
                return false;
            }
        } else {
            // loadingClose();
            console.log('url 错误:返回结果：err = 无法请求，无效的请求！');
        }
    };
    /**
     * POST 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiPost = function (url, data, params, responseType) {
        return new Promise((resolve, reject) => {
            AxiosInst.post(url, data, {
                params: params,
                responseType: responseType ? responseType : 'json'
            }).then((response) => {
                // console.log(response)
                // loadingClose();
                resolve(response.data);
            }).catch((error) => {
                console.log(error)
                // loadingClose();
                reject(error);
            });
        });
    };
    /**
     * GET 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiGet = function (url, data, responseType) {
        return new Promise((resolve, reject) => {
            AxiosInst.get(url, {
                params: data,
                responseType: responseType ? responseType : 'json'
            }).then((response) => {
                // loadingClose();
                resolve(response.data);
            }).catch((error) => {
                // loadingClose();
                reject(error);
            });
        });
    };

};
export default Http;
