//公共连接模块
let models = require('./db') // 引入db配置
let mysql = require('mysql') // mysql模块

// 连接数据库
let conn = mysql.createConnection(models.mysql)
conn.connect(function(err) {
    if (err) {
        console.error('连接数据库失败:- ' + err.stack);
        return;
    }
    console.log('连接数据库成功 Id:- ' + conn.threadId);
});
module.exports = conn
