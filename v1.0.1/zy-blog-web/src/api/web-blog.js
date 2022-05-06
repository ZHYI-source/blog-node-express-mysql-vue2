/**
 *@author ZY
 *@date 2022/2/10
 *@Description:文章列表
*/
import {post,get} from "./http";

//站点信息
export const getSiteInfo = (data) =>
    post("/zy-server/web/site/info", data);
//站点社交信息
export const getSiteSocials = (data) =>
    post("/zy-server/web/socials", data);
//站点关于
export const getSiteAbout = (data) =>
    post("/zy-server/web/about", data);
//站点关于
export const getSiteMusic = (data) =>
    post("/zy-server/web/music", data);

//文章列表
export const dirArticle = (data) =>
    post("/zy-server/web/article/list", data);
//文章详情
export const getArticleDetail = (data) =>
    post("/zy-server/web/article/detail", data);
//文章分类列表
export const dirArticleClass = (data) =>
    get("/zy-server/web/article_class/list", data);

//文章评论列表
export const dirComment = (data) =>
    post("/zy-server/web/comment/list", data);
//提交评论
export const getCreateComment = (data) =>
    post("/zy-server/web/comment/create", data);
