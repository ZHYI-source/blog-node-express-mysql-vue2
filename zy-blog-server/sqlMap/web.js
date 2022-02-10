
/**
 *@author ZY
 *@date 2022/2/10
 *@Description:客户端的sql语句文件
 */

const webSqlMap = {

    article: {
        all: "SELECT * FROM zy_article"
    },
    // //全局字典
    // dict: {
    //     add: "INSERT INTO mk_dict (id,name,description,createdTime,modifyTime,codeName) VALUES (?,?,?,?,?,?)",//增加字典
    //     all: 'SELECT * FROM sys_dict',//查询所有字典
    //     del: 'DELETE FROM mk_dict WHERE id=?',// 删除字典
    //     update:'UPDATE mk_dict SET name=?,description=?,createdTime=?,modifyTime=?,codeName=? WHERE id = ?',
    //     query: 'SELECT * FROM mk_dict WHERE id=?',//详情查询
    // },
   }
module.exports = webSqlMap
