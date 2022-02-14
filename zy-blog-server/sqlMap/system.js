
/**
 *@author ZY
 *@date 2022/2/10
 *@Description:后台管理的sql语句文件
*/

const systemSqlMap = {
    //web站点音乐
    webMusicOpt: {
        list: "SELECT * FROM zy_web_music ",

        count: "SELECT COUNT(id) FROM zy_web_music;",

        create:"INSERT INTO zy_web_music (id,name,artist,url,cover,lrc,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?)",

        delete:"DELETE FROM zy_web_music WHERE id=?",

        update:"UPDATE zy_web_music SET name=?,artist=?,url=?,cover=?,lrc=?,insertTime=?,updateTime=? WHERE id=?",

    },//web站点关于我
    webAboutOpt: {
        list: "SELECT * FROM zy_web_about ",

        count: "SELECT COUNT(id) FROM zy_web_about;",

        create:"INSERT INTO zy_web_about (id,aboutTitle,aboutContent,insertTime,updateTime) VALUES (?,?,?,?,?)",

        delete:"DELETE FROM zy_web_about WHERE id=?",

        update:"UPDATE zy_web_about SET aboutTitle=?,aboutContent=?,insertTime=?,updateTime=? WHERE id=?",

    },
    //博文管理
    articleOpt: {
        list: "SELECT * FROM zy_article ",

        count: "SELECT COUNT(id) FROM zy_article;",

        create:"INSERT INTO zy_article (id,classId,className,classValue,title,isPublish,summary,commentsCount,viewsCount,img,content,isTop,isHot,pubTime,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",

        delete:"DELETE FROM zy_article WHERE id=?",

        update:"UPDATE zy_article SET classId=?,className=?,classValue=?,isPublish=?,title=?,summary=?,commentsCount=?,viewsCount=?,img=?,content=?,isTop=?,isHot=?,pubTime=?,insertTime=?,updateTime=? WHERE id=?",

        publish:"UPDATE zy_article SET isPublish=?,pubTime=? WHERE id=?",
    },
    //博文分类管理
    articleClassOpt: {
        list: "SELECT * FROM zy_article_class ",

        count: "SELECT COUNT(id) FROM zy_article_class;",

        create:"INSERT INTO zy_article_class (id,className,classValue,path,query,insertTime,updateTime) VALUES (?,?,?,?,?,?,?)",

        delete:"DELETE FROM zy_article_class WHERE id=?",

        update:"UPDATE zy_article_class SET className=?,classValue=?,path=?,query=?,insertTime=?,updateTime=? WHERE id=?",

    },
    //博文评论管理
    articleCommentsOpt: {
        list: "SELECT * FROM zy_comments ",

        count: "SELECT COUNT(id) FROM zy_comments;",

        delete:"DELETE FROM zy_comments WHERE id=?",

        deleteMore:"DELETE FROM zy_comments WHERE parentId=?",

        subCommentCount: "UPDATE zy_article SET commentsCount=? WHERE id=?",

    },
   }
module.exports = systemSqlMap
