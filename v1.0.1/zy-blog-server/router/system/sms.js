/**
 *@author ZY
 *@date 2022/2/10
 *@Description:后台系统管理
 */
let express = require('express') // express框架
let router = express.Router() // express路由
const captchaCtrl = require('../../controller/sms/captcha')
const loginCtrl = require('../../controller/sms/login')
const adminUserCtrl = require('../../controller/sms/admin-user')
const adminRoleCtrl = require('../../controller/sms/admin-role')
// 图片验证码
router.get('/zy-server/sms/captcha', captchaCtrl.queryCaptcha)
// 后台登录
router.post('/zy-server/admin/login', loginCtrl.login)
// 后台退出
router.post('/zy-server/admin/logout', loginCtrl.logout)
// 管理员信息
router.get('/zy-server/admin/info', loginCtrl.adminInfo)
// 管理员列表
router.get('/zy-server/admin/list', loginCtrl.adminList)
// 角色列表
router.get('/zy-server/admin/role/list', loginCtrl.roleList)
// 角色选择
router.get('/zy-server/admin/role/options', loginCtrl.roleOptions)


/**
 *@author ZY
 *@date 2022/2/18 21:03
 *@Description:admin用户
 */
// 用户列表
router.post('/zy-server/admin/user/list', adminUserCtrl.adminUserList)
// 用户增加
router.post('/zy-server/admin/user/create', adminUserCtrl.adminUserCreate)
// 用户删除
router.post('/zy-server/admin/user/delete', adminUserCtrl.adminUserDelete)
// 用户更新
router.post('/zy-server/admin/user/update', adminUserCtrl.adminUserUpdate)

/**
 *@author ZY
 *@date 2022/2/18 21:03
 *@Description:admin角色
 */
// 角色列表
router.post('/zy-server/admin/role/list', adminRoleCtrl.adminRoleList)
// 角色增加
router.post('/zy-server/admin/role/create', adminRoleCtrl.adminRoleCreate)
// 角色删除
router.post('/zy-server/admin/role/delete', adminRoleCtrl.adminRoleDelete)
// 角色更新
router.post('/zy-server/admin/role/update', adminRoleCtrl.adminRoleUpdate)
// 权限列表
router.get('/zy-server/admin/role/getPermissions', adminRoleCtrl.getPermissions)

module.exports = router
