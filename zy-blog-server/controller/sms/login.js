
let {setToken} = require('../../utils/token')
let {aes} = require('../../utils/crypto')
let $sql = require('../../sqlMap/system') // sql语句
let comMethods = require('../../utils/common') // 引入公共连接池
// 登录
exports.login = async (req, res, next) => {
    try {
        //查询是否有该用户
        let params = req.body
        let psd = aes.de(params.userPassword)
        let sql = $sql.adminUserOpt.list + ` WHERE username='${params.loginAccount}' AND password='${psd}'`
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            if (resData.records&&resData.records.length) {
                setToken(params.loginAccount, params.userPassword).then(_token => {
                    let _data = {
                        data: {
                            adminInfo: {
                                "orgName": "",
                                "roles": ["超级管理员"],
                                "name": "admin",
                                "perms": ["*"],
                                "userNickName": "超级管理员",
                                "userId": "1",
                                "orgId": "O1-1"},
                            token: _token
                        },
                        errMsg: "登录成功",
                        error: 0
                    }
                    res.status(200).json(_data)
                })
            } else {
                let _data = {
                    errMsg: "用户名或密码错误！",
                    error: 602
                }
                res.status(200).json(_data)
            }
        }).catch(err => {
            console.log('--查询登录用户信息错误--', err)
        })


    } catch (err) {
        next(err)
    }
}
// 退出系统登录
exports.logout = async (req, res, next) => {
    try {
        // let sql = $sql.dict.all_dict_type
        let parms = req.body
        let data = {
            errmsg: "成功",
            errno: 0
        }
        res.json(data) //以json的方式返回客户端
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         console.log("错误", err)
        //         return
        //     }
        //     if (result) {
        //         res.json({data: result, parms: parms}) //以json的方式返回客户端
        //     }
        // })
    } catch (err) {
        next(err)
    }
}
//管理员信息
exports.adminInfo = async (req, res, next) => {
    try {
        let token = req.body.token
        let data = {
            data: {
                "orgName": "",
                "roles": ["超级管理员"],
                "name": "admin",
                // "perms": ['GET /admin/role/list',
                //     'POST /admin/role/create',
                //     'POST /admin/role/update',
                //     'POST /admin/role/delete'],
                "perms": ['*'],
                "userNickName": "超级管理员",
                "userId": "1",
                "orgId": "O1-1"
            },
            errmsg: "成功",
            errno: 0
        }
        res.json(data) //以json的方式返回客户端
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         console.log("错误", err)
        //         return
        //     }
        //     if (result) {
        //         res.json({data: result, parms: parms}) //以json的方式返回客户端
        //     }
        // })
    } catch (err) {
        next(err)
    }
}
//管理员信息
exports.adminList = async (req, res, next) => {
    try {
        let token = req.body.token
        let data = {
            current: 1,
            records: [
                {
                    insertTimestamp: 1639205918024,
                    roleId: "1",
                    updateTimestamp: 1639206419642,
                    userId: "1469562249344573441",
                    userName: "red",
                    userNickName: "ddd",
                }
            ],
            size: 20,
            total: 6,
        }
        res.json(data) //以json的方式返回客户端
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         console.log("错误", err)
        //         return
        //     }
        //     if (result) {
        //         res.json({data: result, parms: parms}) //以json的方式返回客户端
        //     }
        // })
    } catch (err) {
        next(err)
    }
}

//管理员角色
exports.roleList = async (req, res, next) => {
    try {
        let token = req.body.token
        let data = {
            data: {
                limit: 20,
                list: [{
                    describe: "描述",
                    id: "1468915337109037058",
                    insertTimestamp: 1639205632115,
                    isAdmin: 0,
                    name: "测试角色3",
                    status: 0,
                    updateTimestamp: 1639378101616,
                }],
                page: 1,
                pages: 1,
                total: "3",
            },
            errmsg: "成功",
            errno: 0,
        }
        res.json(data) //以json的方式返回客户端
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         console.log("错误", err)
        //         return
        //     }
        //     if (result) {
        //         res.json({data: result, parms: parms}) //以json的方式返回客户端
        //     }
        // })
    } catch (err) {
        next(err)
    }
}

//管理员角色
exports.roleOptions = async (req, res, next) => {
    try {
        let token = req.body.token
        let data = {
            data: {
                limit: 3,
                list: [
                    {
                        label: "超级管理员",
                        value: "1"
                    }
                ],
                page: 1,
                pages: 1,
                total: 3,
            },
            errmsg: "成功",
            errno: 0,
        }
        res.json(data) //以json的方式返回客户端
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         console.log("错误", err)
        //         return
        //     }
        //     if (result) {
        //         res.json({data: result, parms: parms}) //以json的方式返回客户端
        //     }
        // })
    } catch (err) {
        next(err)
    }
}

