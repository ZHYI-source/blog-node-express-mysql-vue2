
import {post} from "@/api/http";

export const dirAboutList = (data) =>
  post("/mg/api/private/about/list", data);

export const dirAboutDelete = (id) =>
  post("/mg/api/private/about/delete", {id});


export const dirAboutCreate = (data) =>
  post("/mg/api/private/about/create", data);

export const dirAboutUpdate = (data) =>
  post("/mg/api/private/about/update", data);
