let $systemSqlMap = require('../../sqlMap/system') // sql语句
let comMethods = require('../../utils/common') // 引入公共连接池
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块

/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:文章管理
 */
//查询文章列表
exports.articleList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0;
        let queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.title && params.params.classId) {
            queryTotal=$systemSqlMap.articleOpt.count + ` WHERE id='${params.params.id}' AND title='${params.params.title}' AND classId='${params.params.classId}'`
            sql = $systemSqlMap.articleOpt.list + ` WHERE id='${params.params.id}' AND title='${params.params.title}' AND classId='${params.params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.id) {
            queryTotal=$systemSqlMap.articleOpt.count +` WHERE id='${params.params.id}'`
            sql = $systemSqlMap.articleOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.title) {
            queryTotal=$systemSqlMap.articleOpt.count +` WHERE id='${params.params.title}'`
            sql = $systemSqlMap.articleOpt.list + ` WHERE title='${params.params.title}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.classId) {
            queryTotal=$systemSqlMap.articleOpt.count +` WHERE id='${params.params.classId}'`
            sql = $systemSqlMap.articleOpt.list + ` WHERE classId='${params.params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal=$systemSqlMap.articleOpt.count
            sql = $systemSqlMap.articleOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
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
//添加文章
exports.articleCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.create,
            queryClassData = $systemSqlMap.articleClassOpt.list + ` WHERE id='${params.classId}'`
        //查询分类数据
        comMethods.commonQuery(queryClassData).then(data => {
            let resData = data || {}
            if (data.error) {
                res.json(resData)
            } else {
                //正常添加文章
                let createParams = [
                    tools.createRandomId(),
                    resData.records[0].id,
                    resData.records[0].className,
                    resData.records[0].classValue,
                    params.title, 0,
                    params.summary, 0, 0, params.img,
                    params.content, params.isTop, params.isHot, '',
                    tools.getDate(),
                    '',
                ]
                comMethods.commonQuery(sql, createParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            }

        }).catch(err => {
            console.log('--添加文章分类错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//修改文章
exports.articleUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.update,
            queryClassData = $systemSqlMap.articleClassOpt.list + ` WHERE id='${params.classId}'`

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
//删除文章
exports.articleDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.delete,
            deleteParams = [params.id,]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//发布文章
exports.articlePublish = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleOpt.publish,
            publishParams = [1, tools.getDate(), params.id,]

        comMethods.commonQuery(sql, publishParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}

/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:文章分类管理
 */
exports.articleClassList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.className) {
            queryTotal= $systemSqlMap.articleClassOpt.count+ ` WHERE id='${params.params.id}' AND className='${params.params.className}'`
            sql = $systemSqlMap.articleClassOpt.list + ` WHERE id='${params.params.id}' AND className='${params.params.className}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.id) {
            queryTotal= $systemSqlMap.articleClassOpt.count+ ` WHERE id='${params.params.id}'`
            sql = $systemSqlMap.articleClassOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.className) {
            queryTotal= $systemSqlMap.articleClassOpt.count+ ` WHERE className='${params.params.className}'`
            sql = $systemSqlMap.articleClassOpt.list + ` WHERE className='${params.params.className}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal= $systemSqlMap.articleClassOpt.count
            sql = $systemSqlMap.articleClassOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章分类错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.articleClassCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleClassOpt.create,
            queryRepeatClass = $systemSqlMap.articleClassOpt.list + ` WHERE classValue='${params.classValue}' OR className='${params.className}'`,
            createParams = [
                tools.createRandomId(),
                params.className,
                params.classValue,
                params.path,
                params.query,
                tools.getDate(),
                '',
            ]
        //查询是否有重复的分类数据
        comMethods.commonQuery(queryRepeatClass).then(data => {
            let resData = data || {}
            if (resData.records.length > 0) {
                resData.errMsg = '分类值或分类名已存在'
                resData.error = 1
                //返回错误信息
                res.json(resData)
            } else {
                comMethods.commonQuery(sql, createParams).then(data => {
                    let realRes = data || {}
                    res.json(realRes)
                })
            }
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.articleClassUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleClassOpt.update,
            updateParams = [
                params.className,
                params.classValue,
                params.path,
                params.query,
                params.insertTime,
                tools.getDate(),
                params.id,
            ]
        comMethods.commonQuery(sql, updateParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}
//删除
exports.articleClassDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleClassOpt.delete,
            deleteParams = [params.id,]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:站点关于我数据管理
 */
exports.webAboutList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.aboutTitle) {
            queryTotal = $systemSqlMap.webAboutOpt.count + ` WHERE id='${params.params.id}' AND aboutTitle='${params.params.aboutTitle}'`
            sql = $systemSqlMap.webAboutOpt.list + ` WHERE id='${params.params.id}' AND aboutTitle='${params.params.aboutTitle}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.id) {
            queryTotal = $systemSqlMap.webAboutOpt.count + ` WHERE id='${params.params.id}'`
            sql = $systemSqlMap.webAboutOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.aboutTitle) {
            queryTotal = $systemSqlMap.webAboutOpt.count + ` WHERE aboutTitle='${params.params.aboutTitle}'`
            sql = $systemSqlMap.webAboutOpt.list + ` WHERE aboutTitle='${params.params.aboutTitle}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal = $systemSqlMap.webAboutOpt.count
            sql = $systemSqlMap.webAboutOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询web关于我错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.webAboutCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webAboutOpt.create,
            createParams = [
                tools.createRandomId(),
                params.aboutTitle,
                params.aboutContent,
                tools.getDate(),
                '',
            ]
        comMethods.commonQuery(sql, createParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.webAboutUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webAboutOpt.update,
            updateParams = [
                params.aboutTitle,
                params.aboutContent,
                params.insertTime,
                tools.getDate(),
                params.id,
            ]
        comMethods.commonQuery(sql, updateParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}
//删除
exports.webAboutDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webAboutOpt.delete,
            deleteParams = [params.id]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:站点音乐数据管理
 */
exports.webMusicList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.name) {
            queryTotal = $systemSqlMap.webMusicOpt.count + ` WHERE id='${params.params.id}' AND name='${params.params.name}'`
            sql = $systemSqlMap.webMusicOpt.list + ` WHERE id='${params.params.id}' AND name='${params.params.name}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.id) {
            queryTotal = $systemSqlMap.webMusicOpt.count + ` WHERE id='${params.params.id}' `
            sql = $systemSqlMap.webMusicOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.name) {
            queryTotal = $systemSqlMap.webMusicOpt.count + ` WHERE name='${params.params.name}' `
            sql = $systemSqlMap.webMusicOpt.list + ` WHERE name='${params.params.name}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal = $systemSqlMap.webMusicOpt.count
            sql = $systemSqlMap.webMusicOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询web音乐错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.webMusicCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webMusicOpt.create,
            createParams = [
                tools.createRandomId(),
                params.name,
                params.artist,
                params.url,
                params.cover,
                params.lrc,
                tools.getDate(),
                '',
            ]
        comMethods.commonQuery(sql, createParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.webMusicUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webMusicOpt.update,
            updateParams = [
                params.name,
                params.artist,
                params.url,
                params.cover,
                params.lrc,
                params.insertTime,
                tools.getDate(),
                params.id,
            ]
        comMethods.commonQuery(sql, updateParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}
//删除
exports.webMusicDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webMusicOpt.delete,
            deleteParams = [params.id]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:站点信息数据管理
 */
exports.webSiteInfoList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.id && params.params.name) {
            queryTotal=$systemSqlMap.webMusicOpt.count + ` WHERE id='${params.params.id}' AND name='${params.params.name}'`
            sql = $systemSqlMap.webMusicOpt.list + ` WHERE id='${params.params.id}' AND name='${params.params.name}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.id) {
            queryTotal=$systemSqlMap.webMusicOpt.count + ` WHERE id='${params.params.id}'`
            sql = $systemSqlMap.webMusicOpt.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.name) {
            queryTotal=$systemSqlMap.webMusicOpt.count + ` WHERE name='${params.params.name}'`
            sql = $systemSqlMap.webMusicOpt.list + ` WHERE name='${params.params.name}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal=$systemSqlMap.webMusicOpt.count
            sql = $systemSqlMap.webMusicOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询web音乐错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
//添加
exports.webSiteInfoCreate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webMusicOpt.create,
            createParams = [
                tools.createRandomId(),
                params.name,
                params.artist,
                params.url,
                params.cover,
                params.lrc,
                tools.getDate(),
                '',
            ]
        comMethods.commonQuery(sql, createParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}
//修改
exports.webSiteInfoUpdate = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webMusicOpt.update,
            updateParams = [
                params.name,
                params.artist,
                params.url,
                params.cover,
                params.lrc,
                params.insertTime,
                tools.getDate(),
                params.id,
            ]
        comMethods.commonQuery(sql, updateParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })

    } catch (err) {
        next(err)
    }
}
//删除
exports.webSiteInfoDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.webMusicOpt.delete,
            deleteParams = [params.id]
        comMethods.commonQuery(sql, deleteParams).then(data => {
            let realRes = data || {}
            res.json(realRes)
        })
    } catch (err) {
        next(err)
    }
}

/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:文章评论管理
 */
exports.articleCommentList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0,
            queryTotal = ''
        //多条件查询
        if (params.params.postId && params.params.fromUserName) {
            queryTotal = $systemSqlMap.articleCommentsOpt.count + ` WHERE postId='${params.params.postId}' AND fromUserName='${params.params.fromUserName}'`
            sql = $systemSqlMap.articleCommentsOpt.list + ` WHERE postId='${params.params.postId}' AND fromUserName='${params.params.fromUserName}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.postId) {
            queryTotal = $systemSqlMap.articleCommentsOpt.count + ` WHERE postId='${params.params.postId}'`
            sql = $systemSqlMap.articleCommentsOpt.list + ` WHERE postId='${params.params.postId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else if (params.params.fromUserName) {
            queryTotal = $systemSqlMap.articleCommentsOpt.count + ` WHERE fromUserName='${params.params.fromUserName}'`
            sql = $systemSqlMap.articleCommentsOpt.list + ` WHERE fromUserName='${params.params.fromUserName}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        } else {
            queryTotal = $systemSqlMap.articleCommentsOpt.count
            sql = $systemSqlMap.articleCommentsOpt.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }
        comMethods.queryCount(queryTotal).then(data => {
            total = data
        })
        comMethods.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章评论错误--', err)
        })
    } catch (err) {
        next(err)
    }
}

//删除评论
exports.articleCommentDelete = async (req, res, next) => {
    try {
        let params = req.body,
            sql = $systemSqlMap.articleCommentsOpt.delete,
            sqlMoreDelete = $systemSqlMap.articleCommentsOpt.deleteMore,
            subSql = $systemSqlMap.articleCommentsOpt.subCommentCount,//
            querySql = $systemSqlMap.articleOpt.list + ` WHERE id='${params.postId}'`,//查询哪篇文章
            queryAllcommentsSql = $systemSqlMap.articleCommentsOpt.list + ` WHERE id='${params.id}'`,
            deleteParams = [params.id]
        //记录评论数
        comMethods.commonQuery(queryAllcommentsSql).then(data => {
            //删除根评论
            if (data.records[0].parentId == '0') {
                //查询出需要删除的相关评论数量
                let a = $systemSqlMap.articleCommentsOpt.list + ` WHERE parentId='${data.records[0].id}'`
                comMethods.commonQuery(a).then(rdata => {
                    let deleNum = rdata.records.length + 1
                    // 查询哪条文章
                    comMethods.commonQuery(querySql).then(adata => {
                        let realRest = adata || {}
                        let num = realRest.records[0].commentsCount - deleNum
                        //去文章表更新评论数
                        comMethods.commonQuery(subSql, [num, params.postId]).then(kdata => {
                            //删除根评论
                            comMethods.commonQuery(sql, deleteParams).then(ydata => {
                                //删除所有条子评论
                                comMethods.commonQuery(sqlMoreDelete, [data.records[0].id]).then(odata => {
                                    let realRes = odata || {}
                                    res.json(realRes)
                                })
                            })
                        })
                    })
                })

            } else {
                //删除子评论
                // 查询哪条文章
                comMethods.commonQuery(querySql).then(data => {
                    let realRest = data || {}
                    let num = realRest.records[0].commentsCount - 1
                    //更新评论数
                    comMethods.commonQuery(subSql, [num, params.postId]).then(data => {
                        //删除评论
                        comMethods.commonQuery(sql, deleteParams).then(data => {
                            let realRes = data || {}
                            res.json(realRes)
                        })
                    })
                })
            }


        })

    } catch (err) {
        next(err)
    }
}
