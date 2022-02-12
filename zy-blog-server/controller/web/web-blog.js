let $webSqlMap = require('../../sqlMap/web') // sql语句
let comMethods = require('../../utils/common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块

/**
 *@author ZY
 *@date 2022/2/12 15:11
 *@Description:web端博文
 */
//查询文章列表
exports.webArticleList = async (req, res, next) => {
    try {
        let params = req.body, sql = '', total = 0;
        let queryTotal = $webSqlMap.articleOpt.count + ` WHERE isPublish=1`
        //多条件查询
        if (params.params.title) {
            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish='${1}' AND title='${params.params.title}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        }else {
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

