

import {post} from "./http";

//分类列表
export const dirCateList = (data) =>
    post("/mg/api/public/web/sort/list ", data);
