const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const POST_DAO = require("../dao/POST_DAO");
const Article = db.article;
const Cate = db.cate;
const Tags = db.tags;
const ArticleTags = db.ArticleTags;
const Comments = db.comments;

//博文和标签是多对多的
//addTags、getTags、setTags 操作中间表的方法 会自动创建
Article.belongsToMany(Tags, {
    through: {
        model: ArticleTags,
        unique: false,
    }, foreignKey: 'article_id',
});
//addArticle、getArticle、setArticle
Tags.belongsToMany(Article, {
    through: {
        model: ArticleTags,
        unique: false,
    }, foreignKey: 'tag_id',
});

//博文和分类是一对一的
Cate.hasOne(Article, {foreignKey: 'sort_id', sourceKey: 'id'});
Article.belongsTo(Cate, {foreignKey: 'sort_id', sourceKey: 'id'});

//博文和评论是一对多的
Article.hasMany(Comments, {foreignKey: 'article_id', sourceKey: 'id'});
Comments.belongsTo(Article, {foreignKey: 'article_id', sourceKey: 'id'});


// Create and Save a new article
exports.create = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.article_title) return res.sendResult({data: '', code: 500, message: "文章标题不能为空！"})

    if (!pm.article_content) return res.sendResult({data: '', code: 500, message: "文章内容不能为空！"})

    if (!pm.sort_id) return res.sendResult({data: '', code: 500, message: "分类不能为空！"})

    // Create a article
    const newArticle = {
        article_title: pm.article_title,
        article_content: pm.article_content,
        article_cover: pm.article_cover,
        article_summary: pm.article_summary || '"' + pm.article_title + '"',
        isPublish: pm.isPublish,
        sort_id: pm.sort_id,
        isHot: pm.isHot,
        isTop: pm.isTop,
        isRecommend: pm.isRecommend,
        reprint: pm.reprint,
        editType: pm.editType,
    };
    let tags = await Tags.findAll({where: {id: pm.tag_ids}}) //查询所有对应的tag
    // 创建文章
    await POST_DAO.create(Article, newArticle, (createArticleData, cresult) => {
        //setTags 是设置中间表的方法 增加文章和标签的联系记录
        createArticleData.setTags(tags)
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：创建成功！`);
        res.sendResult(cresult(createArticleData, 200, '创建成功'))
    })
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const pm = req.body
    pm.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
    pm.include = [
        {model: Tags, attributes: [['id', 'tagId'],['tag_name', 'name'], ['tag_desc', 'desc']]},
        {model: Cate, attributes: [['id', 'cateId'],['sort_name', 'name'], ['sort_desc', 'desc']]},
        {model: Comments, attributes: [['id', 'commentId'], ['content', 'commentContent']]},
    ]
    DAO.list(Article, pm, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Retrieve all user from the database.
exports.findAllGroup = (req, res) => {
    const pm = req.body
    pm.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
    pm.include = [
        {model: Tags, attributes: [['tag_name', 'name'], ['tag_desc', 'desc']]},
        {model: Cate, attributes: [['sort_name', 'name'], ['sort_desc', 'desc']]},
    ]
    // pm.attributes = ["article_title"]
    //按月统计
    let sql = "SELECT DATE_FORMAT( createdAt, \"%c\" ) AS mouth ,count(id) AS count\n" +
        "FROM mg_articles \n" +
        "GROUP BY DATE_FORMAT( createdAt, \"%c\" )"
    //按天数
    let daySql = "\n" +
        "SELECT DATE_FORMAT( createdAt, '%Y-%m-%d' ) AS day ,count(id) AS count\n" +
        "FROM mg_articles \n" +
        "GROUP BY DATE_FORMAT( createdAt, '%Y-%m-%d' ) "
    DAO.doQuery(daySql, dayData => {
        DAO.doQuery(sql, monthData => {
            DAO.list(Article, pm, data => {
                let dayDatasNum = []
                for (const datum of dayData.data[0]) {
                    let item = []
                    item.push(datum.day)
                    item.push(datum.count)
                    dayDatasNum.push(item)
                }
                data.data.dayData = dayDatasNum
                data.data.monthData = monthData.data[0]
                res.sendResult(data)
            })
        })

    })

};

// Find a single Article with an id 查看文章详情并且更新浏览人数
exports.findOne = (req, res) => {
    const pm = {};
    pm.params = {
        id: req.body.id
    }
    pm.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
    pm.include = [
        {model: Tags, attributes: [['tag_name', 'name'], ['tag_desc', 'desc']]},
        {model: Cate, attributes: [['id', 'cateId'], ['sort_name', 'name'], ['sort_desc', 'desc']]},
    ]
    DAO.findOne(Article, pm, _a => {
        let p = {
            viewsCount: parseInt(_a.data.viewsCount) + 1
        }
        DAO.update(Article, p, {id: _a.data.id}, r => {
            DAO.findOne(Article, pm, data => {
                // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
                res.sendResult(data)
            })
        })
    })
};

// Update a Article by the id in the request
exports.update = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 500, message: "ID不能为空！"})
    //id为需要修改的ID,data = {name:'修改文章',tagIds:[1]}
    let tags = await Tags.findAll({where: {id: pm['tag_ids']}})
    Article.findByPk(pm.id).then(function (post) {
        post.update(pm)
        post.setTags(tags) //更新中间表
        res.sendResultAto(null, 200, '修改成功')
    })
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 500, message: "ID不能为空！"})
    //删除关联的标签
    // 1.1 查询是否有关联的标签 有就删除
    DAO.delete(ArticleTags, {article_id: pm.id}, dataTag => {
        //删除关联的所有评论
        Comments.destroy({where:{article_id:pm.id}}).then(_decom =>{
            DAO.delete(Article, {id: pm.id}, data => {
                // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
                res.sendResult(data)
            })
        })
    })

};

// Delete all Article from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Article, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete Article from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `Article`'
    DAO.doQuery(sql, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
