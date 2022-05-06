const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const Website = db.website;

// Create and Save a new Website
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.name)  return res.sendResult({data: '', code: 605, message: "站点名称不能为空！"})
    if (!pm.avatar)  return res.sendResult({data: '', code: 605, message: "站点头像不能为空！"})
    if (!pm.slogan)  return res.sendResult({data: '', code: 605, message: "站点格言不能为空！"})
    if (!pm.notice)  return res.sendResult({data: '', code: 605, message: "站点通知不能为空！"})

    // Create a Website
    const website = {
        avatar: pm.avatar,
        slogan: pm.slogan,
        domain: pm.domain,
        notice: pm.notice,
        desc: pm.desc,
        name: pm.name,
        globalStyle: pm.globalStyle,
    };

    Website.findAll().then(singleWebsite=>{
        if (singleWebsite[0].id)  return  res.sendResultAto(null,605,'站点信息只能配置一条')
        DAO.create(Website, website, data => {
            logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    }).catch(err=>{
        console.log(err)
    })


};

// Retrieve all Website from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Website, pm, list => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single Website with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Website,pm,data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a Website by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    if (!pm.name)  return res.sendResult({data: '', code: 605, message: "站点名称不能为空！"})
    if (!pm.avatar)  return res.sendResult({data: '', code: 605, message: "站点头像不能为空！"})
    if (!pm.slogan)  return res.sendResult({data: '', code: 605, message: "站点格言不能为空！"})
    if (!pm.notice)  return res.sendResult({data: '', code: 605, message: "站点通知不能为空！"})

    DAO.update(Website,pm,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a Website with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Website,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};



