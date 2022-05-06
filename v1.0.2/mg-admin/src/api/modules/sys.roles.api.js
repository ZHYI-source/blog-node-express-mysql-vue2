
import {get, post} from "@/api/http";

export const dirRolesList = (data) =>
  post("/mg/api/private/roles/list", data);

export const dirRolesOne = (data) =>
  post("/mg/api/private/roles/one", data);


export const dirRolesDelete = (id) =>
  post("/mg/api/private/roles/delete", {id});


export const dirRolesCreate = (data) =>
  post("/mg/api/private/roles/create", data);

export const dirRolesUpdate = (data) =>
  post("/mg/api/private/roles/update", data);

export const dirRolesCreatePermission = (data) =>
  post("/mg/api/private/roles/createPermission", data);
