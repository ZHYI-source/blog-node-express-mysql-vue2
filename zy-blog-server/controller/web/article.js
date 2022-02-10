let $sql = require('../../sqlMap/web') // sql语句
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块

//查询字典列表业务处理
exports.queryArticle = async (req, res, next) => {
    try {
        let sql = $sql.article.all
        let parms = req.body
        conn.query(sql, function (err, result) {
            if (err) {
                console.log("错误", err)
                return
            }
            if (result) {
                res.json({data: result, parms: parms}) //以json的方式返回客户端
            }
        })
    } catch (err) {
        next(err)
    }

}

