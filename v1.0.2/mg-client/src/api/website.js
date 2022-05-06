

import {post} from "./http";

//站点信息
export const dirWebsiteList = (data) =>
    post("/mg/api/public/web/website/list", data);
//社交信息
export const dirSocialsList = (data) =>
    post("/mg/api/public/web/socials/list", data);
//关于博主信息
export const dirAboutList = (data) =>
    post("/mg/api/public/web/about/list", data);
//关于音乐信息
export const dirMusicList = (data) =>
  post("/mg/api/public/web/music/list", data);
