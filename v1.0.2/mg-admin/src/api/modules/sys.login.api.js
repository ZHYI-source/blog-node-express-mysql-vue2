
import {get, post} from "@/api/http";

export const getLoginCaptcha = (data) =>
  get("/mg/api/public/admin/captcha", data);

export const getLogin = (data) =>
  post("/mg/api/public/admin/login", data);
