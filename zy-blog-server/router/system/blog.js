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
//
router.post('/zy-server/article/create', blogCtrl.articleCreate) //文章增加
//
router.post('/zy-server/article/update', blogCtrl.articleUpdate) //文章更新
//
router.post('/zy-server/article/delete', blogCtrl.articleDelete) //文章删除

router.post('/zy-server/article/publish', blogCtrl.articlePublish) //文章发布

/*文章分类*/
router.post('/zy-server/article_class/list', blogCtrl.articleClassList) //文章列表
//
router.post('/zy-server/article_class/create', blogCtrl.articleClassCreate) //文章增加
//
router.post('/zy-server/article_class/update', blogCtrl.articleClassUpdate) //文章更新
//
router.post('/zy-server/article_class/delete', blogCtrl.articleClassDelete) //文章删除

// /*文章评论*/
router.post('/zy-server/article_comments/list', blogCtrl.articleCommentList) //文章评论列表
//
router.post('/zy-server/article_comments/delete', blogCtrl.articleCommentDelete) //文章评论删除

/*web站点关于我*/
router.post('/zy-server/web_about/list', blogCtrl.webAboutList) //关于我列表
//
router.post('/zy-server/web_about/create', blogCtrl.webAboutCreate) //关于我增加
//
router.post('/zy-server/web_about/update', blogCtrl.webAboutUpdate) //关于我更新
//
router.post('/zy-server/web_about/delete', blogCtrl.webAboutDelete) //关于我删除

/*web站点音乐*/
router.post('/zy-server/web_music/list', blogCtrl.webMusicList) //音乐列表
//
router.post('/zy-server/web_music/create', blogCtrl.webMusicCreate) //音乐增加
//
router.post('/zy-server/web_music/update', blogCtrl.webMusicUpdate) //音乐更新
//
router.post('/zy-server/web_music/delete', blogCtrl.webMusicDelete) //音乐删除

/*web站点信息*/
router.post('/zy-server/web_site_info/list', blogCtrl.webSiteInfoList) //站点信息列表
//
router.post('/zy-server/web_site_info/create', blogCtrl.webSiteInfoCreate) //站点信息增加
//
router.post('/zy-server/web_site_info/update', blogCtrl.webSiteInfoUpdate) //站点信息更新
//
router.post('/zy-server/web_site_info/delete', blogCtrl.webSiteInfoDelete) //站点信息删除



module.exports = router
