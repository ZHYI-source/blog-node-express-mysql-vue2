
import {post} from "@/api/http";

export const dirTablesList = (data) =>
  post("/mg/api/private/code/list", data);

export const getOneTableInfo = (data) =>
  post("/mg/api/private/code/one", data);
