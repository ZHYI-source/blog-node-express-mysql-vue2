const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const {sendMailer} = require("../utils/utils.nodemailer");
const Message = db.message;

// Create and Save a new Message
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.email) return res.sendResult({data: '', code: 605, message: "留言邮箱不能为空！"})
    if (!pm.content) return res.sendResult({data: '', code: 605, message: "留言描述不能为空！"})

    // Create a Message
    const newMessage = {
        email: pm.email,
        status: false,
        content: pm.content,
    };

    DAO.create(Message, newMessage, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Retrieve all Message from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Message, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Message with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Message, pm, data => {
        res.sendResult(data)
    })
};

// Update a Message by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.update(Message, pm, {id: pm.id}, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete a Message with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    DAO.delete(Message, {id: pm.id}, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// 回复留言
exports.replyMsg = (req, res) => {
    const pm = req.body;
    sendMailer({email: pm.email, content: pm.content}).then(info => {
        //去修改状态
        // pm.status = true
        Message.update({status:true}, {
            where: {
                id: pm.id
            }
        }).then(_info => {
            res.status(200).sendResultAto(info, 200, '回复成功！')
        })
    }).catch(err => {
        res.status(500).sendResultAto(err, 605, '回复失败！')
    })

};

