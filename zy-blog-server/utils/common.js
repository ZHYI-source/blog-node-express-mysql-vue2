/**
 *@author ZY
 *@date 2022/2/10
 *@Description:公共查询方法
 */
let conn = require('../common') // 引入公共连接池

const comMethods = {
    commonQuery: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            conn.query(sql, params, function (err, result) {
                result ?
                    resolve({
                        error: 0,
                        current: params.current || 1,
                        records: result,
                        size: params.size || 20,
                        errMsg: '操作错误'
                    })
                    :
                    console.log("错误", err)
                    reject({
                        error: 1,
                        errMsg: '错误'
                    })
            })
        })
    },
    //查询数据总条数
    queryCount: (querySql) => {
        return new Promise((resolve, reject) => {
            conn.query(querySql, function (err, rows1, result) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(rows1[0]['COUNT(id)'])
            })

        })
    }
}


module.exports = comMethods
