
// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
const bodyParser = require('body-parser')
const cors = require('cors')// 解决跨域
const express = require('express') // express框架
const fs = require('fs');
const path = require('path');

// const vertoken=require('./token/token') //生产token
// const expressJwt=require('express-jwt')
const errorHandler = require ('./middleware/error-handler')
const app = express()
// json请求
app.use(bodyParser.json())
//解决跨域
app.use(cors())
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //跨域问题
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
// 表单请求
app.use(bodyParser.urlencoded({ extended: false }))

//路由挂载
app.use(require('./router'))
app.use(errorHandler())
// 监听端口
app.listen(5220) // 监听server5220端口
console.log('success listen at port:5220')
