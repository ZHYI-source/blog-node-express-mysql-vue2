/**
 *@author ZY
 *@date 2021/12/9
 *@Description:管理端用户管理
 * 注意：如果是导出的话一定要注意responseType设置为blob
*/
export const adminSysApi ={
  /*登录*/
  api_admin_login: {url: '/zy-server/admin/login', method: 'post',},
  api_admin_captcha: {url: '/zy-server/sms/captcha', method: 'get',},

  /**用户模块**/
  api_admin_user_list: {url: '/zy-server/admin/user/list', method: 'post',},
  api_admin_user_create: {url: '/zy-server/admin/user/create', method: 'post',},
  api_admin_user_delete: {url: '/zy-server/admin/user/delete', method: 'post',},
  api_admin_user_update: {url: '/zy-server/admin/user/update', method: 'post',},
  /**角色模块**/
  api_admin_role_list: {url: '/zy-server/admin/role/list', method: 'post',},
  api_admin_role_create: {url: '/zy-server/admin/role/create', method: 'post',},
  api_admin_role_delete: {url: '/zy-server/admin/role/delete', method: 'post',},
  api_admin_role_update: {url: '/zy-server/admin/role/update', method: 'post',},
  //权限列表
  api_admin_role_getPermissions: {url: '/zy-server/admin/role/getPermissions', method: 'get',},
}
