/**
 *@author ZY
 *@date 2022/2/10
 *@Description:文章列表
*/
import {post} from "./http";
//文章
export const dirArticle = (data) =>
    post("/zy-server/web/article/list", data);
