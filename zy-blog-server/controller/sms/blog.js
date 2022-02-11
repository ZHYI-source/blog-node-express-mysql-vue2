let $systemSqlMap = require('../../sqlMap/system') // sql语句
let queryCount = require('../../utils/common') // 引入公共连接池
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块

//查询文章列表
exports.articleList = async (req, res, next) => {
    try {
        let parms = req.body
        let sql = ''
        //多条件查询
        if (parms.params.id && parms.params.title){
            sql = $systemSqlMap.articleOpt.list + ` WHERE id='${parms.params.id}' AND title='${parms.params.title}' ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        } else if (parms.params.id){
            sql = $systemSqlMap.articleOpt.list + ` WHERE id='${parms.params.id}' ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        }else if (parms.params.title){
            sql = $systemSqlMap.articleOpt.list + ` WHERE title='${parms.params.title}' ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        }else {
            sql = $systemSqlMap.articleOpt.list + ` ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        }
        let queryTotal = $systemSqlMap.articleOpt.count
        let total = queryCount(queryTotal)
        conn.query(sql, function (err, result) {
            if (err) {
                console.log("错误", err)
                let data = {
                    error: 1,
                    errMsg: '查询错误'
                }
                res.json(data)
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
//添加文章
exports.articleCreate = async (req, res, next) => {
    try {
        let parms = req.body
        let sql = $systemSqlMap.articleOpt.create
        let data = [
            tools.createRandomId(), parms.title,
            parms.summary, parms.commentsCount, parms.img,
            parms.content, parms.isTop, parms.isHot, '',
            tools.getDate(),
            '',
        ]
        conn.query(sql, data, function (err, result) {
            if (err) {
                console.log("错误", err)
                let data = {
                    error: 1,
                    errMsg: '添加错误',
                    data: err
                }
                res.json(data)
            }
            if (result) {
                let data = {
                    error: 0,
                    msg: '添加成功!'
                }
                res.json(data) //以json的方式返回客户端
            }
        })
    } catch (err) {
        next(err)
    }
}
//修改文章
exports.articleUpdate = async (req, res, next) => {
    try {
        let parms = req.body
        let sql = $systemSqlMap.articleOpt.update
        let data = [
            parms.title,
            parms.summary, parms.commentsCount, parms.img,
            parms.content, parms.isTop, parms.isHot, '',
            parms.insertTime,
            tools.getDate(),
            parms.id,
        ]
        conn.query(sql, data, function (err, result) {
            if (err) {
                console.log("错误", err)
                let data = {
                    error: 1,
                    errMsg: '修改错误',
                    data: err
                }
                res.json(data)
            }
            if (result) {
                let data = {
                    error: 0,
                    msg: '更新成功!'
                }
                res.json(data) //以json的方式返回客户端
            }
        })
    } catch (err) {
        next(err)
    }
}
//删除文章
exports.articleDelete = async (req, res, next) => {
    try {
        let parms = req.body
        let sql = $systemSqlMap.articleOpt.delete
        let data = [parms.id,]
        conn.query(sql, data, function (err, result) {
            if (err) {
                console.log("错误", err)
                let data = {
                    error: 1,
                    errMsg: '删除失败',
                    data: err
                }
                res.json(data)
            }
            if (result) {
                let data = {
                    error: 0,
                    msg: '删除成功!'
                }
                res.json(data) //以json的方式返回客户端
            }
        })
    } catch (err) {
        next(err)
    }
}

