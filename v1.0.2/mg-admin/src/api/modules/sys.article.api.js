import {get, post} from "@/api/http";

export const dirArticleList = (data) =>
  post("/mg/api/private/article/list", data);

export const dirArticleDelete = (id) =>
  post("/mg/api/private/article/delete", {id});

export const dirArticleCreate = (data) =>
  post("/mg/api/private/article/create", data);

export const dirArticleUpdate = (data) =>
  post("/mg/api/private/article/update", data);

