const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const Friends = db.friends;

// Create and Save a new Friends
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.email)  return res.sendResult({data: '', code: 605, message: "友链邮箱不能为空！"})
    if (!pm.siteName)  return res.sendResult({data: '', code: 605, message: "站点名称不能为空！"})
    if (!pm.path)  return res.sendResult({data: '', code: 605, message: "友链链接不能为空！"})
    if (!pm.desc)  return res.sendResult({data: '', code: 605, message: "友链描述不能为空！"})

    // Create a Friends
    const newFriend = {
        email: pm.email,
        siteName: pm.siteName,
        path: pm.path,
        desc: pm.desc,
    };

    Friends.findOne({where:{'siteName':pm.siteName}}).then(singleFriends=>{
        if (singleFriends&&singleFriends.id)  return  res.sendResultAto(null,605,'友链已存在！')
        DAO.create(Friends, newFriend, data => {
            logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    })
};

// Retrieve all Friends from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Friends, pm, list => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single Friends with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Friends,pm,data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a Friends by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.update(Friends,pm,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a Friends with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Friends,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete all Friends from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Friends,data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

