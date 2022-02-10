let $sql = require('../../sqlMap') // sql语句
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块

//查询文章列表
exports.articleList = async (req, res, next) => {
    try {
        let sql = $sql.article.all
        let parms = req.body
        conn.query(sql, function (err, result) {
            if (err) {
                console.log("错误", err)
                return
            }
            if (result) {
                let data = {
                    current: 1,
                    records: result,
                    size: 20,
                    total: 33,
                }
                res.json(data) //以json的方式返回客户端
            }
        })
    } catch (err) {
        next(err)
    }
}

