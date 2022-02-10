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

router.post('/zy-server/article/create', blogCtrl.articleCreate) //文章增加

router.post('/zy-server/article/update', blogCtrl.articleUpdate) //文章更新

router.post('/zy-server/article/delete', blogCtrl.articleDelete) //文章删除


module.exports = router
