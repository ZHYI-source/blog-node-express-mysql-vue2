const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const Socials = db.socials;

// Create and Save a new Socials
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.icon)  return res.sendResult({data: '', code: 605, message: "社交名称不能为空！"})
    if (!pm.color)  return res.sendResult({data: '', code: 605, message: "社交头像不能为空！"})

    // Create a Socials
    const socials = {
        icon: pm.icon,
        color: pm.color,
        title: pm.title,
        href: pm.href,
        text: pm.text,
        img: pm.img,
    };

    Socials.findAll({where:{'icon':pm.icon}}).then(singleSocials=>{
        if (singleSocials.length&&singleSocials[0].id)  return  res.sendResultAto(null,605,'不能配置多条社交信息')
        DAO.create(Socials, socials, data => {
            logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    }).catch(err=>{
        console.log(err)
    })


};

// Retrieve all Socials from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Socials, pm, list => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single Socials with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Socials,pm,data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a Socials by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.icon)  return res.sendResult({data: '', code: 605, message: "社交名称不能为空！"})
    if (!pm.color)  return res.sendResult({data: '', code: 605, message: "社交头像不能为空！"})

    DAO.update(Socials,pm,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a Socials with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Socials,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};



