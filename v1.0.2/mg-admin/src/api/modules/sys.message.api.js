
import {get, post} from "@/api/http";

export const dirMessageList = (data) =>
  post("/mg/api/private/message/list", data);


export const dirMessageDelete = (id) =>
  post("/mg/api/private/message/delete", {id});


export const dirMessageCreate = (data) =>
  post("/mg/api/private/message/create", data);

export const dirMessageUpdate = (data) =>
  post("/mg/api/private/message/update", data);

export const messageReply = (data) =>
  post("/mg/api/private/message/replyMsg", data);
