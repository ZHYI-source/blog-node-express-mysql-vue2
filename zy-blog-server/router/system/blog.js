/**
 *@author ZY
 *@date 2022/2/10
 *@Description:后台系统博客管理
 */
let express = require('express') // express框架
let router = express.Router() // express路由
const blogCtrl = require('../../controller/sms/blog')
/*文章管理*/
router.post('/zy-server/article/list', blogCtrl.articleList) //文章列表


module.exports = router
