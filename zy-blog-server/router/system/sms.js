/**
 *@author ZY
 *@date 2022/2/10
 *@Description:后台系统管理
 */
let express = require('express') // express框架
let router = express.Router() // express路由
const captchaCtrl = require('../../controller/sms/captcha')
const loginCtrl = require('../../controller/sms/login')
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


module.exports = router
