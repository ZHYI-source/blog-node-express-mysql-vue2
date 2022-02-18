let $systemSqlMap = require('../../sqlMap/system') // sql语句
let comMethods = require('../../utils/common') // 引入公共查询
let tools = require('../../utils/tools') // 引入工具模块
/**
 *@author ZY
 *@date 2022/2/18 20:30
 *@Description:管理端用户中心
 */
exports.adminUserList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.username) {
            sql = $systemSqlMap.adminUserOpt.list + ` WHERE id='${params.params.id}' AND username='${params.params.username}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = $systemSqlMap.adminUserOpt.count + ` WHERE id='${params.params.id}' AND username='${params.params.username}'`
        } else if (params.params.id) {
            sql = $systemSqlMap.adminUserOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = $systemSqlMap.adminUserOpt.count + ` WHERE id='${params.params.id}'`
        } else if (params.params.username) {
            queryTotal = $systemSqlMap.adminUserOpt.count + ` WHERE username='${params.params.username}'`
            sql = $systemSqlMap.adminUserOpt.list + ` WHERE username='${params.params.username}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal = $systemSqlMap.adminUserOpt.count
            sql = $systemSqlMap.adminUserOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询管理端用户错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.adminUserCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminUserOpt.create,
            createParams = [
                tools.createRandomId(),
                params.username,
                params.password,
                tools.getDate(),
                '',
            ]
        comMethods.commonQuery(sql, createParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.adminUserUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminUserOpt.update,
            updateParams = [
                params.username,
                params.password,
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
exports.adminUserDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminUserOpt.delete,
            deleteParams = [params.id]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
