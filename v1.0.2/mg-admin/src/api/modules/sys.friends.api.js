
import {get, post} from "@/api/http";

export const dirFriendsList = (data) =>
  post("/mg/api/private/friends/list", data);


export const dirFriendsDelete = (id) =>
  post("/mg/api/private/friends/delete", {id});


export const dirFriendsCreate = (data) =>
  post("/mg/api/private/friends/create", data);

export const dirFriendsUpdate = (data) =>
  post("/mg/api/private/friends/update", data);
