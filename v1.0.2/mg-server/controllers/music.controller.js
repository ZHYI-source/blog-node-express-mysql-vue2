const db = require("../models");
const DAO = require("../dao/DAO");
const Music = db.music;

// Create and Save a new Music
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.name) return res.sendResult({data: '', code: 605, message: "名称不能为空！"})
    if (!pm.url) return res.sendResult({data: '', code: 605, message: "地址不能为空！"})
    // Create a Music
    const music = {
        name: pm.name,
        author: pm.author,
        url: pm.url,
        cover: pm.cover,
        lrc: pm.lrc,
    };
    DAO.create(Music, music, data => {
        res.sendResult(data)
    })
};

// Retrieve all Music from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Music, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Music with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Music, pm, data => {
        res.sendResult(data)
    })
};

// Update a Music by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    if (!pm.name) return res.sendResult({data: '', code: 605, message: "名称不能为空！"})
    if (!pm.url) return res.sendResult({data: '', code: 605, message: "地址不能为空！"})
    DAO.update(Music, pm, {id: pm.id}, data => {
        res.sendResult(data)
    })

};

// Delete a Music with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Music, {id: pm.id}, data => {
        res.sendResult(data)
    })

};

