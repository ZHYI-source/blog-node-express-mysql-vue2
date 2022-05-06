const express = require('express');
const router = express.Router();
const Friends = require("../../../controllers/friends.controller");

/**
 * 创建友链信息
 * @route POST /api/private/friends/create
 * @group 友链管理 - Operations about friends
 * @param {string} siteName.query.required - 请输入友链名称
 * @param {string} desc.query.required - 请输入友链描述
 * @param {string} path.query.required - 请输入友链路径
 * @param {string} email.query.required - 请输入邮箱
 * @returns {object} 200 - An array of friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Friends.create);

/**
 * 删除友链信息
 * @route POST /api/private/friends/delete
 * @group 友链管理 - delete of friends
 * @param {number} id - 请输入友链ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Friends.delete);
/**
 * 查询友链信息列表
 * @route POST /api/private/friends/list
 * @group 友链管理 - list of friends
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Friends.findAll);
/**
 * 更新友链信息列表
 * @route POST /api/private/friends/update
 * @group 友链管理 - list of friends
 * @param {string} siteName.query.required - 请输入友链名称
 * @param {string} desc.query.required - 请输入友链描述
 * @param {string} email.query.required - 请输入友链邮箱
 * @param {string} path.query.required - 请输入友链连接
 * @returns {object} 200 - An array of friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Friends.update);

/**
 * 删除全部友链信息
 * @route POST /api/private/friends/deleteAll
 * @group 友链管理 - list of friends
 * @returns {object} 200 - An array of friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Friends.deleteAll);


module.exports = router;
