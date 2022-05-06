const express = require('express');
const router = express.Router();
const Friends = require("../../../../controllers/message.controller");

/**
 * 创建留言信息
 * @route POST /api/private/message/create
 * @group 留言管理 - Operations about message
 * @param {string} content.query.required - 请输入留言描述
 * @param {string} email.query.required - 请输入邮箱
 * @returns {object} 200 - An array of message info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Friends.create);

/**
 * 删除留言信息
 * @route POST /api/private/message/delete
 * @group 留言管理 - delete of message
 * @param {number} id - 请输入留言ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of message info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Friends.delete);
/**
 * 查询留言信息列表
 * @route POST /api/private/message/list
 * @group 留言管理 - list of message
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of message info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Friends.findAll);
/**
 * 更新留言信息列表
 * @route POST /api/private/message/update
 * @group 留言管理 - list of message
 * @param {string} content.query.required - 请输入留言描述
 * @param {string} email.query.required - 请输入留言邮箱
 * @returns {object} 200 - An array of message info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Friends.update);

module.exports = router;
