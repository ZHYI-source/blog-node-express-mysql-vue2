const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const comments = db.comments;
const Article = db.article;

// Create and Save a new comment
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.content) return res.sendResult({data: '', code: 605, message: "评论内容不能为空！"})
    if (!pm.article_id) return res.sendResult({data: '', code: 605, message: "评论文章标题不能为空！"})

    // Create a comment
    const newComment = {
        content: pm.content,
        article_id: pm.article_id,
        article_title: pm.article_title,
        pid: pm.pid,
        from_userId: pm.from_userId,
        from_username: pm.from_username,
        from_user_logo: pm.from_user_logo,
        to_userId: pm.to_userId,
        to_username: pm.to_username,
        to_user_logo: pm.to_user_logo,
    };
    pm.params = {
        id: pm.article_id
    }
    DAO.findOne(Article, pm, _a => {
        let p = {
            commentsCount: parseInt(_a.data.commentsCount) + 1
        }
        DAO.update(Article, p, {id: _a.data.id}, r => {
            DAO.create(comments, newComment, data => {
                // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
                res.sendResult(data)
            })
        })
    })

};

// Retrieve all comment from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(comments, pm, list => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Update a comment by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})

    DAO.update(comments, pm, {id: pm.id}, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a comment with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;

    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    /*
    * 删除评论逻辑
    * 1.查询本条评论 拿到pid和article_id
    * 2.判断是否是顶级 pid=0
    * 3.是：删除所有子评论 和 本评论数据
    *
    * 3.0 查询所有 pid=pm.id 的子评论数量 +1 （用于更新文章的评论数）
    * 3.1 先删除本条评论
    * 3.2 删除 pid=pm.id 相同的评论
    * 3.3 更新文章的评论数
    *
    * 4.否：删除本条评论
    * 4.1 更新文章评论数
    * */

    //1.查询本条评论 拿到pid和article_id
    comments.findOne({where: {id: pm.id}})
        .then(commentInfo => {
            let _pid = commentInfo.pid //评论pid
            let _aid = commentInfo.article_id //文章id
            let commentsCount = 1
            //2.判断是否是顶级 pid=0
            if (parseInt(_pid) !== 0) {
                //4.否：删除本条评论
                comments.destroy({where: {id: pm.id}}).then(delData => {
                    //4.1 更新文章评论数
                    // 4.1.0 查询该文章的评论数
                    Article.findOne({where: {id: _aid}}).then(_aData => {
                        let p = {
                            commentsCount: (parseInt(_aData.commentsCount) - 1) <= 0 ? 0 : parseInt(_aData.commentsCount) - 1
                        }
                        // 更新文章的评论数
                        Article.update(p, {where: {id: _aid}}).then(_sunD => {
                            res.sendResultAto(delData, 200, '删除评论成功！')
                        })
                    })
                })
            } else {
                //3.是：删除所有子评论 和 本评论数据
                // 3.0 查询所有 pid=pm.id 的子评论数量 +1 （用于更新文章的评论数）
                comments.findAndCountAll({where: {pid: pm.id}}).then(_comCount => {
                    //暂存评论数更新数量
                    commentsCount += _comCount.count
                    //    删除子评论
                    comments.destroy({where: {pid: pm.id}}).then(delData => {
                        //    删除本评论
                        comments.destroy({where: {id: pm.id}}).then(_delData => {
                            //    更新文章评论数
                            //4.1 更新文章评论数
                            // 4.1.0 查询该文章的评论数
                            Article.findOne({where: {id: _aid}}).then(_atData => {
                                let p = {
                                    commentsCount: (parseInt(_atData.commentsCount) - commentsCount) <= 0 ? 0 : parseInt(_atData.commentsCount) - commentsCount
                                }
                                // 更新文章的评论数
                                Article.update(p, {where: {id: _aid}}).then(_sunD => {
                                    res.sendResultAto(delData, 200, '删除评论成功！')
                                })
                            })
                        })
                    })
                })
            }
        })
        .catch(err => {
            res.sendResultAto(err, 605, '删除失败或者评论已不存在！')
        })
};

// Delete comment from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `mg_comments`'
    DAO.doQuery(sql, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
