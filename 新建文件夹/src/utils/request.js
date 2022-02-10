import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
    // api的base_url  //请求页面数据地址
    baseURL: process.env.VUE_APP_API,
    timeout: 5000 // request timeout
})
//把数据对象序列化成 json字符串
service.defaults.transformRequest = data => JSON.stringify(data);
//设置请求头
service.defaults.headers={
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiemhvdXlpIiwiY29kZSI6InY5YW0iLCJpYXQiOjE2NDEzNTAxNTcsImV4cCI6MTY0MTM4NjE1N30.B8XR0ZzrYQvrAnaMXCTAYHAzuUHypG9Llr7exAvJNYQ',
    'Content-Type' : 'application/json'
};
// 请求拦截器
service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

export default service
