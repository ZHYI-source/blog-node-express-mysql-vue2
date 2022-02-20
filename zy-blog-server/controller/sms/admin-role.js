let $systemSqlMap = require('../../sqlMap/system') // sql语句
let comMethods = require('../../utils/common') // 引入公共查询
let tools = require('../../utils/tools') // 引入工具模块
/**
 *@author ZY
 *@date 2022/2/18 20:30
 *@Description:管理端角色中心
 */
exports.adminRoleList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.roleName) {
            sql = $systemSqlMap.adminRoleOpt.list + ` WHERE id='${params.params.id}' AND roleName='${params.params.roleName}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = $systemSqlMap.adminRoleOpt.count + ` WHERE id='${params.params.id}' AND roleName='${params.params.roleName}'`
        } else if (params.params.id) {
            sql = $systemSqlMap.adminRoleOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = $systemSqlMap.adminRoleOpt.count + ` WHERE id='${params.params.id}'`
        } else if (params.params.roleName) {
            queryTotal = $systemSqlMap.adminRoleOpt.count + ` WHERE roleName='${params.params.roleName}'`
            sql = $systemSqlMap.adminRoleOpt.list + ` WHERE roleName='${params.params.roleName}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal = $systemSqlMap.adminRoleOpt.count
            sql = $systemSqlMap.adminRoleOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
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
exports.adminRoleCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminRoleOpt.create,
            createParams = [
                tools.createRandomId(),
                params.roleName,
                params.roleKey,
                params.roleAuth,
                tools.getDate(),
                '',
            ]
        console.log(createParams)
        comMethods.commonQuery(sql, createParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.adminRoleAuth = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminRoleOpt.auth,
            createParams = [
                tools.createRandomId(),
                params.roleName,
                params.roleKey,
                params.roleAuth,
                tools.getDate(),
                '',
            ]
        console.log(createParams)
        comMethods.commonQuery(sql, createParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.adminRoleUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminRoleOpt.update,
            updateParams = [
                params.roleName,
                params.roleKey,
                params.roleAuth,
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
exports.adminRoleDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.adminRoleOpt.delete,
            deleteParams = [params.id]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//角色权限列表
exports.getPermissions = async (req, res, next) => {
    try {
        let data = {
            data: {
                assignedPermissions: [
                    "admin:operate:complaint:list", "admin:operate:driver:list", "admin:operate:rideRecord:list",
                ],
                systemPermissions: [{
                    id: "系统设置",
                    label: "系统设置",
                    children: [
                        {
                            id: "用户中心",
                            label: "用户中心",
                            children: [
                                {
                                    api: "POST /admin/admin/list",
                                    id: "admin:sys:admin:list",
                                    label: "查询"
                                },
                                {
                                    api: "POST /admin/admin/update",
                                    id: "admin:sys:admin:update",
                                    label: "编辑"
                                }
                            ]
                        }
                    ]
                }],
            },
            errMsg: "成功",
            errno: 0,
        }
        res.json(data)
        // let params = req.body,
        //     sql = $systemSqlMap.adminRoleOpt.delete,
        //     deleteParams = [params.id]
        // comMethods.commonQuery(sql, deleteParams).then(data => {
        //     let realRes = data || {}
        //
        // })
    } catch (err) {
        next(err)
    }
}
