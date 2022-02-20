/**
 * 连接数据库文件
 * */
module.exports = {
    mysql: {
        host: "114.117.164.181",
        user: "zy_blog",
        password: "bYpEiwXdytCdsC8W",
        database: "zy_blog",
        port: '3306', // mysql链接端口
        connectTimeout: 5000, //连接超时
        multipleStatements: false //是否允许一个query中包含多条sql语句
    }
    // mysql: {
    //     host: "localhost",
    //     user: "root",
    //     // password: "zhouyi....568568",
    //     password: "root",
    //     database: "zy-blog",
    //     port: '3306', // mysql链接端口
    //     connectTimeout: 5000, //连接超时
    //     multipleStatements: false //是否允许一个query中包含多条sql语句
    // }

}
