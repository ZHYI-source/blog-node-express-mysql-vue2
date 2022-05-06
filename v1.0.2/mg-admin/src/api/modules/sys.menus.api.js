
import {get, post} from "@/api/http";

export const dirMenusList = (data) =>
  post("/mg/api/private/menus/list", data);


export const dirMenusDelete = (id) =>
  post("/mg/api/private/menus/delete", {id});


export const dirMenusCreate = (data) =>
  post("/mg/api/private/menus/create", data);

export const dirMenusUpdate = (data) =>
  post("/mg/api/private/menus/update", data);
