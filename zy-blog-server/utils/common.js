/**
 *@author ZY
 *@date 2022/2/10
 *@Description:公共查询方法
*/
let conn = require('../common') // 引入公共连接池

 const queryCount = (querySql)=>{
    conn.query(querySql, function (err, rows1, result) {
        return rows1[0]['COUNT(id)']
    })
}

module.exports=queryCount
