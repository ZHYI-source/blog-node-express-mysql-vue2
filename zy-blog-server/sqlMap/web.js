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

        update: "UPDATE zy_article SET classId=?,className=?,classValue=?,isPublish=?,title=?,summary=?,commentsCount=?,viewsCount=?,img=?,content=?,isTop=?,isHot=?,pubTime=?,insertTime=?,updateTime=? WHERE id=?",

    },
}
module.exports = webSqlMap
