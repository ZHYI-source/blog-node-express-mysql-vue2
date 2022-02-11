
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

        create:"INSERT INTO zy_article (id,title,isPublish,summary,commentsCount,img,content,isTop,isHot,pubTime,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",

        delete:"DELETE FROM zy_article WHERE id=?",

        update:"UPDATE zy_article SET isPublish=?,title=?,summary=?,commentsCount=?,img=?,content=?,isTop=?,isHot=?,pubTime=?,insertTime=?,updateTime=? WHERE id=?",

        publish:"UPDATE zy_article SET isPublish=?,pubTime=? WHERE id=?",
    },
    //博文分类管理
    articleClassOpt: {
        list: "SELECT * FROM zy_article_class ",

        count: "SELECT COUNT(id) FROM zy_article_class;",

        create:"INSERT INTO zy_article_class (id,className,classValue,insertTime,updateTime) VALUES (?,?,?,?,?)",

        delete:"DELETE FROM zy_article_class WHERE id=?",

        update:"UPDATE zy_article_class SET className=?,classValue=?,insertTime=?,updateTime=? WHERE id=?",

    },

   }
module.exports = systemSqlMap
