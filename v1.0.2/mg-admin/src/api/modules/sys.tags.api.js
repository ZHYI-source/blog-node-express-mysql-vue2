
import {get, post} from "@/api/http";

export const dirTagsList = (data) =>
  post("/mg/api/private/tags/list", data);

export const dirTagsDelete = (id) =>
  post("/mg/api/private/tags/delete", {id});

export const dirTagsCreate = (data) =>
  post("/mg/api/private/tags/create", data);

export const dirTagsUpdate = (data) =>
  post("/mg/api/private/tags/update", data);
