/**
 *@author ZY
 *@date 2021/12/9
 *@Description:中智项目web管理端api
 * 注意：如果是导出的话一定要注意responseType设置为blob
 */
export const blogApi = {


  /**博客文章管理**/
  api_blog_article_list: {url: '/zy-server/article/list', method: 'post',},//文章列表

  api_blog_article_create: {url: '/zy-server/article/create', method: 'post',},//文章添加

  api_blog_article_update: {url: '/zy-server/article/update', method: 'post',},//文章修改

  api_blog_article_delete: {url: '/zy-server/article/delete', method: 'post',},//文章删除

  api_blog_article_publish: {url: '/zy-server/article/publish', method: 'post',},//文章发布

  /**博客文章分类**/
  api_blog_article_class_list: {url: '/zy-server/article_class/list', method: 'post',},//文章分类列表

  api_blog_article_class_create: {url: '/zy-server/article_class/create', method: 'post',},//文章分类添加

  api_blog_article_class_update: {url: '/zy-server/article_class/update', method: 'post',},//文章分类修改

  api_blog_article_class_delete: {url: '/zy-server/article_class/delete', method: 'post',},//文章分类删除

  /**博客文章分类**/
  api_blog_article_comments_list: {url: '/zy-server/article_comments/list', method: 'post',},//文章评论列表

  api_blog_article_comments_delete: {url: '/zy-server/article_comments/delete', method: 'post',},//文章评论删除

  /*web站点信息设置*/

  api_blog_web_about_list: {url: '/zy-server/web_about/list', method: 'post',},//web站点关于列表

  api_blog_web_about_create: {url: '/zy-server/web_about/create', method: 'post',},//web站点关于添加

  api_blog_web_about_update: {url: '/zy-server/web_about/update', method: 'post',},//web站点关于修改

  api_blog_web_about_delete: {url: '/zy-server/web_about/delete', method: 'post',},//web站点关于删除


  api_blog_web_music_list: {url: '/zy-server/web_music/list', method: 'post',},//web站点音乐列表

  api_blog_web_music_create: {url: '/zy-server/web_music/create', method: 'post',},//web站点音乐添加

  api_blog_web_music_update: {url: '/zy-server/web_music/update', method: 'post',},//web站点音乐修改

  api_blog_web_music_delete: {url: '/zy-server/web_music/delete', method: 'post',},//web站点音乐删除



  api_blog_web_site_info_list: {url: '/zy-server/web_site_info/list', method: 'post',},//web站点配置列表

  api_blog_web_site_info_create: {url: '/zy-server/web_site_info/create', method: 'post',},//web站点配置添加

  api_blog_web_site_info_update: {url: '/zy-server/web_site_info/update', method: 'post',},//web站点配置修改

  api_blog_web_site_info_delete: {url: '/zy-server/web_site_info/delete', method: 'post',},//web站点配置删除


  api_blog_web_site_socials_list: {url: '/zy-server/web_site_info/list', method: 'post',},//web站点社交列表

  api_blog_web_site_socials_create: {url: '/zy-server/web_site_info/create', method: 'post',},//web站点社交添加

  api_blog_web_site_socials_update: {url: '/zy-server/web_site_info/update', method: 'post',},//web站点社交修改

  api_blog_web_site_socials_delete: {url: '/zy-server/web_site_info/delete', method: 'post',},//web站点社交删除
}
