
import {blogApi} from "@/api/blog/blogs";
import {adminSysApi} from "@/api/sys/admin";
/**
 * url 访问地址
 * 注意：如果是导出的话一定要注意responseType设置为blob
 */
const methodMap = {

  /******项目api分离*****/

  ...blogApi, //博客文章api
  ...adminSysApi, //系统用户api

  /***********************/

  //管理员列表
  api_admin_adminList: {url: '/zy-server/admin/list', method: 'get'},
  //获取用户列表
  api_admin_userList: {url: '/zy-server/admin/userList', method: 'post'},
  //机构用户列表
  api_admin_orgUserList: {url: '/zy-server/admin/admin/orgUserList', method: 'post'},
  //**用户菜单列表**/
  getUserMenu: {url: '/zy-server/admin/userMenuList', method: 'get'},


};
export default methodMap;
