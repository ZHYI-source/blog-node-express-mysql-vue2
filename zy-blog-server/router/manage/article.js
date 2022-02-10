/** 文章 * */
let express = require('express') // express框架
let router = express.Router() // express路由
const articleCtrl = require ('../../controller/manage/article')
// 查询文章列表接口，
router.post('/mk-css/dir_article', articleCtrl.queryArticle)


module.exports = router
