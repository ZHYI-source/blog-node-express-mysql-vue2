
import {get, post} from "@/api/http";

export const dirSocialsList = (data) =>
  post("/mg/api/private/socials/list", data);


export const dirSocialsDelete = (id) =>
  post("/mg/api/private/socials/delete", {id});


export const dirSocialsCreate = (data) =>
  post("/mg/api/private/socials/create", data);

export const dirSocialsUpdate = (data) =>
  post("/mg/api/private/socials/update", data);
