
import {get, post} from "@/api/http";

export const dirCommentsList = (data) =>
  post("/mg/api/private/comments/list", data);


export const dirCommentsDelete = (id) =>
  post("/mg/api/private/comments/delete", {id});


export const dirCommentsCreate = (data) =>
  post("/mg/api/private/comments/create", data);

export const dirCommentsUpdate = (data) =>
  post("/mg/api/private/comments/update", data);
