
import {get, post} from "@/api/http";

export const dirWebsiteList = (data) =>
  post("/mg/api/private/website/list", data);


export const dirWebsiteDelete = (id) =>
  post("/mg/api/private/website/delete", {id});


export const dirWebsiteCreate = (data) =>
  post("/mg/api/private/website/create", data);

export const dirWebsiteUpdate = (data) =>
  post("/mg/api/private/website/update", data);
