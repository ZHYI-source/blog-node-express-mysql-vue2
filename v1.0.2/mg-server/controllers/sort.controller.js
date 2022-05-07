const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const Cate = db.cate;

// Create and Save a new Cate
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.sort_name)  return res.sendResult({data: '', code: 605, message: "分类名称不能为空！"})
    // Create a Cate
    const sort = {
        sort_name: pm.sort_name,
        sort_desc: pm.sort_desc,
        sort_path: pm.sort_path,
    };

    Cate.findOne({where:{'sort_name':pm.sort_name}}).then(singleCate=>{
        if (singleCate&&singleCate.id)  return  res.sendResultAto(null,605,'分类已存在！')
        DAO.create(Cate, sort, data => {
            // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    })


};

// Retrieve all Cate from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Cate, pm, list => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single Cate with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Cate,pm,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a Cate by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.update(Cate,pm,{id:pm.id},data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a Cate with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Cate,{id:pm.id},data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete all Cate from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Cate,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete Cate from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `mg_sort`'
    DAO.doQuery(sql,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
