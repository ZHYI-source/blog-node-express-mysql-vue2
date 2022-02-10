let $systemSqlMap = require('../../sqlMap/system') // sql语句
let queryCount = require('../../utils/common') // 引入公共连接池
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块


//查询文章列表
exports.articleList = async (req, res, next) => {
    try {
        let parms = req.body
        let sql = $systemSqlMap.articleOpt.list + ` LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        let queryTotal = $systemSqlMap.articleOpt.count
        let total = queryCount(queryTotal)
        conn.query(sql, function (err, result) {
            if (err) {
                console.log("错误", err)
                return
            }
            if (result) {
                let data = {
                    current: parms.current,
                    records: result,
                    size: parms.size,
                    total: total,
                }
                res.json(data) //以json的方式返回客户端
            }
        })
    } catch (err) {
        next(err)
    }
}

