const baseModel = require('./base-model')
//文章类数据模型
const articleField = {
    article_id:'',
    user_id:'',
    article_title:'',
    article_content:'',
    article_type:0,
    article_tags:0,
    article_abstract:'',
    article_publish_time:'',
   ...baseModel
}
