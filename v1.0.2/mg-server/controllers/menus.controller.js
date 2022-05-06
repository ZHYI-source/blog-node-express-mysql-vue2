const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const utilsTools = require("../utils/utils.tools");
const Menus = db.menus;

// Create and Save a new Menus
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.title)  return res.sendResult({data: '', code: 605, message: "菜单名称不能为空！"})
    if (!pm.pid)  return res.sendResult({data: '', code: 605, message: "父级ID不能为空！"})
    if (!pm.path)  return res.sendResult({data: '', code: 605, message: "菜单路径不能为空！"})
    // Create a Menus
    const menu = {
        pid: pm.pid,
        path: pm.path,
        title: pm.title,
        lever: pm.lever,
        authority: pm.authority,
        icon: pm.icon || 'th-large',
    };
    Menus.findOne({where:{'path':pm.path}}).then(singleMenus=>{
        if (singleMenus&&singleMenus.id)  return  res.sendResultAto(null,605,'菜单已存在！')
        DAO.create(Menus, menu, data => {
            // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    })
};

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    pm.sort={
        prop:'id',
        order:'asc',
    }
    DAO.list(Menus, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Menus with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Menus,pm,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a Menus by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.update(Menus,pm,{id:pm.id},data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a Menus with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id)  return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Menus,{id:pm.id},data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete all Menus from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Menus,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete Menus from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `mg_menu`'
    DAO.doQuery(sql,data=>{
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
