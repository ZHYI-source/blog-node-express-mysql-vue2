
/**
 *@author ZY
 *@date 2022/2/10
 *@Description:后台管理的sql语句文件
*/

const systemSqlMap = {
    //博文管理
    articleOpt: {
        list: "SELECT * FROM zy_article ",

        count: "SELECT COUNT(id) FROM zy_article;",

        create:"INSERT INTO zy_article (id,title,summary,commentsCount,img,content,isTop,isHot,pubTime,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?)",

        delete:"DELETE FROM zy_article WHERE id=?",

        update:"UPDATE zy_article SET title=?,summary=?,commentsCount=?,img=?,content=?,isTop=?,isHot=?,pubTime=?,insertTime=?,updateTime=? WHERE id=?",
    },

   }
module.exports = systemSqlMap
