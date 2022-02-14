let $webSqlMap = require('../../sqlMap/web') // sql语句
let comMethods = require('../../utils/common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块


/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:web端博文
 */
//站点基础信息
exports.webSiteInfo = async (req, res, next) => {
    try {
        let params = req.body,
        sql = $webSqlMap.webSiteInfo.list
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log('--查询网站基础信息错误--', err)
        })

    } catch (err) {
        next(err)
    }
}
exports.webSocials = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $webSqlMap.webSocials.list
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log('--查询网站社交信息错误--', err)
        })

    } catch (err) {
        next(err)
    }
}


//查询文章列表
exports.webArticleList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0;
        let queryTotal = $webSqlMap.articleOpt.count + ` WHERE isPublish=1 `
        //多条件查询
        if (params.params.title) {
            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish='${1}' AND title='${params.params.title}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.classId) {
            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish='${1}' AND classId='${params.params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.keyword) {
            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish='${1}' AND title LIKE '%${params.params.keyword}%' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.className) {
            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish='${1}' AND className='${params.params.className}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish='${1}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章列表错误--', err)
        })

    } catch (err) {
        next(err)
    }
}

//查询文章详情
exports.webArticleDetail = async (req, res, next) => {
    try {
        let params = req.body, sql = $webSqlMap.articleOpt.list + ` WHERE id='${params.id}'`,
            addViewsCountsql = $webSqlMap.articleOpt.addViewsCount
        //查到具体文章
        comMethods.commonQuery(sql).then(data => {
            let resData = data || {}
            //记录实时浏览次数
            let num = resData.records[0].viewsCount + 1
            comMethods.commonQuery(addViewsCountsql, [num, params.id]).then(data => {
                //重新查询文章返回
                comMethods.commonQuery(sql).then(data => {
                    res.json(data || {})
                })

            })
        }).catch(err => {
            console.log('--查询文章详情错误--', err)
        })

    } catch (err) {
        next(err)
    }
}
//修改文章
exports.webArticleUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $webSqlMap.articleOpt.update,
            queryClassData = $webSqlMap.articleClassOpt.list + ` WHERE id='${params.classId}'`

        //查询分类数据
        comMethods.commonQuery(queryClassData).then(data => {
            let resData = data || {}
            if (data.error) {
                res.json(resData)
            } else {
                let updateParams = [
                    resData.records[0].id,
                    resData.records[0].className,
                    resData.records[0].classValue,
                    params.isPublish,
                    params.title,
                    params.summary, 0, 0, params.img,
                    params.content, params.isTop, params.isHot, params.pubTime,
                    params.insertTime,
                    tools.getDate(),
                    params.id,
                ]
                comMethods.commonQuery(sql, updateParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            }
        })

    } catch (err) {
        next(err)
    }
}
//文章类型列表
exports.webArticleClassList = async (req, res, next) => {
    try {
        let sql = $webSqlMap.articleClassOpt.list
        comMethods.commonQuery(sql).then(data => {
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章分类错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//查询文章评论列表
exports.webCommentList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0;
        let queryTotal = $webSqlMap.commentOpt.count
        //多条件查询
        sql = $webSqlMap.commentOpt.list + ` WHERE postId='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询评论列表错误--', err)
        })

    } catch (err) {
        next(err)
    }
}
//创建文章评论
exports.webCommentCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $webSqlMap.commentOpt.create,
            querySql = $webSqlMap.articleOpt.list + ` WHERE id='${params.postId}'`,
            postSql = $webSqlMap.commentOpt.addCommentCount,
            createParams = [
                tools.createRandomId(),
                params.postId,
                params.parentId,
                params.fromUserId || tools.createRandomId(),
                params.fromUserName,
                params.fromUserAvatar,
                params.content,
                params.toUserId || '',
                params.toUserName,
                params.toUserAvatar,
                tools.getDate(),
                '',
            ]
        //记录评论数
        //查询哪条文章
        comMethods.commonQuery(querySql).then(data => {
            let realRest = data || {}
            let num = realRest.records[0].commentsCount + 1
            //更新评论数
            comMethods.commonQuery(postSql, [num, params.postId]).then(data => {
                //创建评论
                comMethods.commonQuery(sql, createParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            })
        })

    } catch (err) {
        next(err)
    }
}
