/**
 *@author ZY
 *@date 2022/2/12 15:52
 *@Description:web端博客
 */
let express = require('express')
let router = express.Router()
const webBlogCtrl = require('../../controller/web/web-blog')

/*博文数据*/
router.post('/zy-server/web/article/list', webBlogCtrl.webArticleList) //文章列表


module.exports = router
