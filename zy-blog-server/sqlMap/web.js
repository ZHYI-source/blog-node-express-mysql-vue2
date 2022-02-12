/**
 *@author ZY
 *@date 2022/2/10
 *@Description:客户端的sql语句文件
 */

const webSqlMap = {
    //web端博文查询
    articleOpt: {
        list: "SELECT * FROM zy_article ",

        count: "SELECT COUNT(id) FROM zy_article",

        addViewsCount: "UPDATE zy_article SET viewsCount=? WHERE id=?",

    },
}
module.exports = webSqlMap
