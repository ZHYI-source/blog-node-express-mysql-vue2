/**
 * 菜单
 * */
let express = require('express') // express框架
let router = express.Router() // express路由
const menuCtrl = require ('../../controller/menu/menu')
// 查询文章列表接口，
router.get('/system/menu', menuCtrl.queryMenuList)


module.exports = router
