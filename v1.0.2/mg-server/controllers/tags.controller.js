const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const Tags = db.tags;

// Create and Save a new tag
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.tag_name)  return res.sendResult({data: '', code: 605, message: "标签名称不能为空！"})

    // Create a tag
    const tag = {
        tag_name: pm.tag_name,
        tag_desc: pm.tag_desc,
        article_id: pm.article_id,
    };

    Tags.findOne({where:{'tag_name':pm.tag_name}}).then(singleTag=>{
        if (singleTag&&singleTag.id)  return  res.sendResultAto(null,605,'标签已存在！')
        DAO.create(Tags, tag, data => {
            // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    })


};

// Retrieve all tag from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Tags, pm, list => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single tag with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Tags,pm,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a tag by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.update(Tags,pm,{id:pm.id},data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a tag with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Tags,{id:pm.id},data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete all tag from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Tags,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete tag from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `mg_tags`'
    DAO.doQuery(sql,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
