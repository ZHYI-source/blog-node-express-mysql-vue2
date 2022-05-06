
import {get, post} from "@/api/http";

export const dirSortList = (data) =>
  post("/mg/api/private/sort/list", data);


export const dirSortDelete = (id) =>
  post("/mg/api/private/sort/delete", {id});


export const dirSortCreate = (data) =>
  post("/mg/api/private/sort/create", data);

export const dirSortUpdate = (data) =>
  post("/mg/api/private/sort/update", data);
