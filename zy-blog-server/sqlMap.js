/**
 * sql语句文件
 * */

// sqlmap.js
var sqlMap = {
    //菜单表 sys_menu
    menu: {
        all: "SELECT * FROM sys_menu"
    },
    dict: {
        all_dict_type: "SELECT * FROM sys_dict_type"
    },
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
module.exports = sqlMap
