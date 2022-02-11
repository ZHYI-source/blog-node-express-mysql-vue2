/**
 *@author ZY
 *@date 2021/12/9
 *@Description:中智项目web管理端api
 * 注意：如果是导出的话一定要注意responseType设置为blob
*/
export const blogApi ={

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

}
