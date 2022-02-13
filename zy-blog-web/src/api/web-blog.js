/**
 *@author ZY
 *@date 2022/2/10
 *@Description:文章列表
*/
import {post} from "./http";
//文章列表
export const dirArticle = (data) =>
    post("/zy-server/web/article/list", data);
//文章详情
export const getArticleDetail = (data) =>
    post("/zy-server/web/article/detail", data);

//文章评论列表
export const dirComment = (data) =>
    post("/zy-server/web/comment/list", data);
//提交评论
export const getCreateComment = (data) =>
    post("/zy-server/web/comment/create", data);
