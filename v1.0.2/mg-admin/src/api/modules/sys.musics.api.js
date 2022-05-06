
import {get, post} from "@/api/http";

export const dirMusicsList = (data) =>
  post("/mg/api/private/musics/list", data);

export const dirMusicsDelete = (id) =>
  post("/mg/api/private/musics/delete", {id});

export const dirMusicsCreate = (data) =>
  post("/mg/api/private/musics/create", data);

export const dirMusicsUpdate = (data) =>
  post("/mg/api/private/musics/update", data);
