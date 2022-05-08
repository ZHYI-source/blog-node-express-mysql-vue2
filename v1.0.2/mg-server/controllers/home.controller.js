const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const MSG = db.message;
const COMMENTS = db.comments;
const sequelize = db.sequelize;
const {Op} = require("sequelize");

function queryCountAll(model) {
    return new Promise((resolve, reject) => {
        model.findAndCountAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn('DATE', sequelize.col('createdAt')), // 表对应的字段
                        sequelize.literal('CURRENT_DATE')
                    )
                ]
            },
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 查询当天留言信息,评论信息
exports.queryNowMsgAndComments = (req, res) => {
    try {
        queryCountAll(MSG).then(r => {
            queryCountAll(COMMENTS).then(c => {
                res.status(200).sendResultAto({message: r, comments: c}, 200, '查询成功')
            })
        })
    } catch {
        res.status(500).sendResultAto('查询失败')
    }
};


 

