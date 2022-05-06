
import {get, post} from "@/api/http";

export const dirUsersList = (data) =>
  post("/mg/api/private/users/list", data);


export const dirUsersDelete = (id) =>
  post("/mg/api/private/users/delete", {id});


export const dirUsersCreate = (data) =>
  post("/mg/api/private/users/create", data);

export const dirUsersUpdate = (data) =>
  post("/mg/api/private/users/update", data);
