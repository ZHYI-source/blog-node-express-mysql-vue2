//文章归档
import {post} from "../../../../mg-client/src/api/http";

export const getArticleGroup = (data) =>
  post("/mg/api/public/web/article/group", data);
