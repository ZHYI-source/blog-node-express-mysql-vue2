const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const About = db.about;

// Create and Save a new About
exports.create = (req, res) => {
    const pm = req.body;
    if (!pm.about_content) return res.sendResultAto(null,605,'内容不能为空')
    // Create a About
    const about = {
        about_content: pm.about_content,
    };
    About.create(about).then(singleAbout=>{
        res.sendResultAto(singleAbout,200,'添加成功！')
    }).catch(err=>{
        console.log(err)
    })
};

// Retrieve all About from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(About, pm, list => {
        res.sendResult(list)
    })
};

// Find a single About with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(About,pm,data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a About by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    DAO.update(About,pm,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a About with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(About,{id:pm.id},data=>{
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};



