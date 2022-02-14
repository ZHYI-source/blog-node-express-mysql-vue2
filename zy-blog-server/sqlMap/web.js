/**
 *@author ZY
 *@date 2022/2/10
 *@Description:客户端的sql语句文件
 */

const webSqlMap = {
    //web端网站配置
    webSiteInfo: {
        list: "SELECT * FROM zy_web_site_info ",
    },
    webSocials: {
        list: "SELECT * FROM zy_web_socials ",
    },
    //关于
    webAbout: {
        list: "SELECT * FROM zy_web_about ",
    },
    //关于
    webMusic: {
        list: "SELECT * FROM zy_web_music ",
    },
    //web端博文查询
    articleOpt: {
        list: "SELECT * FROM zy_article ",

        count: "SELECT COUNT(id) FROM zy_article",

        addViewsCount: "UPDATE zy_article SET viewsCount=? WHERE id=?",

    },
    //web端博文分类查询
    articleClassOpt: {
        list: "SELECT * FROM zy_article_class ",

        count: "SELECT COUNT(id) FROM zy_article",

        addViewsCount: "UPDATE zy_article SET viewsCount=? WHERE id=?",

    },
    //web端博文评论
    commentOpt: {
        list: "SELECT * FROM zy_comments ",

        create:"INSERT INTO zy_comments (id,postId,parentId,fromUserId,fromUserName,fromUserAvatar,content,toUserId,toUserName,toUserAvatar,createTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",

        count: "SELECT COUNT(id) FROM zy_comments",

        addViewsCount: "UPDATE zy_comments SET viewsCount=? WHERE id=?",

        addCommentCount: "UPDATE zy_article SET commentsCount=? WHERE id=?",

    },
}
module.exports = webSqlMap
