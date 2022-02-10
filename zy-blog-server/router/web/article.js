/** 文章 * */
let express = require('express') // express框架
let router = express.Router() // express路由
const articleCtrl = require ('../../controller/web/article')
// 查询文章列表接口，
router.post('/zy_blog/dir_article', articleCtrl.queryArticle)


module.exports = router
