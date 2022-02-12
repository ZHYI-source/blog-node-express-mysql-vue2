let $systemSqlMap = require('../../sqlMap/system') // sql语句
let comMethods = require('../../utils/common') // 引入公共连接池
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块
/*
* 文章管理
* */
//查询文章列表
exports.articleList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0;
        let queryTotal = $systemSqlMap.articleOpt.count
        //多条件查询
        if (params.params.id && params.params.title && params.params.classId) {
            sql = $systemSqlMap.articleOpt.list + ` WHERE id='${params.params.id}' AND title='${params.params.title}' AND classId='${params.params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.id) {
            sql = $systemSqlMap.articleOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.title) {
            sql = $systemSqlMap.articleOpt.list + ` WHERE title='${params.params.title}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.classId) {
            sql = $systemSqlMap.articleOpt.list + ` WHERE classId='${params.params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            sql = $systemSqlMap.articleOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章列表错误--', err)
        })

    } catch (err) {
        next(err)
    }
}
//添加文章
exports.articleCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.create,
            queryClassData = $systemSqlMap.articleClassOpt.list + ` WHERE id='${params.classId}'`
        //查询分类数据
        comMethods.commonQuery(queryClassData).then(data => {
            let resData = data || {}
            if (data.error) {
                res.json(resData)
            } else {
                //正常添加文章
                let createParams = [
                    tools.createRandomId(),
                    resData.records[0].id,
                    resData.records[0].className,
                    resData.records[0].classValue,
                    params.title, 0,
                    params.summary, params.commentsCount, params.img,
                    params.content, params.isTop, params.isHot, '',
                    tools.getDate(),
                    '',
                ]
                comMethods.commonQuery(sql, createParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            }

        }).catch(err => {
            console.log('--添加文章分类错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//修改文章
exports.articleUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.update,
            queryClassData = $systemSqlMap.articleClassOpt.list + ` WHERE id='${params.classId}'`

        //查询分类数据
        comMethods.commonQuery(queryClassData).then(data => {
            let resData = data || {}
            if (data.error) {
                res.json(resData)
            } else {
                let updateParams = [
                    resData.records[0].id,
                    resData.records[0].className,
                    resData.records[0].classValue,
                    params.isPublish,
                    params.title,
                    params.summary, params.commentsCount, params.img,
                    params.content, params.isTop, params.isHot, params.pubTime,
                    params.insertTime,
                    tools.getDate(),
                    params.id,
                ]
                comMethods.commonQuery(sql, updateParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            }
        })

    } catch (err) {
        next(err)
    }
}
//删除文章
exports.articleDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.delete,
            deleteParams = [params.id,]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//发布文章
exports.articlePublish = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.publish,
            publishParams = [1, tools.getDate(), params.id,]

        comMethods.commonQuery(sql, publishParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}
/*
* 分类管理
* */
exports.articleClassList = async (req, res, next) => {
    try {
        let parms = req.body, sql = '', total = 0,
            queryTotal = $systemSqlMap.articleClassOpt.count
        //多条件查询
        if (parms.params.id && parms.params.className) {
            sql = $systemSqlMap.articleClassOpt.list + ` WHERE id='${parms.params.id}' AND className='${parms.params.className}' ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        } else if (parms.params.id) {
            sql = $systemSqlMap.articleClassOpt.list + ` WHERE id='${parms.params.id}' ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        } else if (parms.params.className) {
            sql = $systemSqlMap.articleClassOpt.list + ` WHERE className='${parms.params.className}' ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        } else {
            sql = $systemSqlMap.articleClassOpt.list + ` ORDER BY ${parms.orderBy} ${parms.orderType} LIMIT ${parms.size} OFFSET ${parms.size * (parms.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, parms).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章分类错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.articleClassCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleClassOpt.create,
            queryRepeatClass = $systemSqlMap.articleClassOpt.list + ` WHERE classValue='${params.classValue}' OR className='${params.className}'`,
            createParams = [
                tools.createRandomId(),
                params.className,
                params.classValue,
                tools.getDate(),
                '',
            ]
        //查询是否有重复的分类数据
        comMethods.commonQuery(queryRepeatClass).then(data => {
            let resData = data || {}
            if (resData.records.length > 0) {
                resData.errMsg = '分类值或分类名已存在'
                resData.error = 1
                //返回错误信息
                res.json(resData)
            } else {
                comMethods.commonQuery(sql, createParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            }
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.articleClassUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleClassOpt.update,
            updateParams = [
                params.className,
                params.classValue,
                params.insertTime,
                tools.getDate(),
                params.id,
            ]
        comMethods.commonQuery(sql, updateParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}
//删除
exports.articleClassDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleClassOpt.delete,
            deleteParams = [params.id,]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
