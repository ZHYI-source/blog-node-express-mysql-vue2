const express = require('express');
const router = express.Router();
const comments = require("../../../controllers/comments.controller");

/**
 * 创建评论信息
 * @route POST /api/private/comments/create
 * @group 评论管理 - Operations about comments
 * @param {string} content.query.required - 请输入评论内容
 * @returns {object} 200 - An array of comments info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", comments.create);

/**
 * 删除评论信息
 * @route POST /api/private/comments/delete
 * @group 评论管理 - delete of comments
 * @param {number} id - 请输入评论ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of comments info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", comments.delete);
/**
 * 查询评论信息列表
 * @route POST /api/private/comments/list
 * @group 评论管理 - list of comments
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of comments info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", comments.findAll);
/**
 * 更新评论信息列表
 * @route POST /api/private/comments/update
 * @group 评论管理 - list of comments
 * @param {string} content.query.required - 请输入评论名称
 * @param {string} comments_desc.query.required - 请输入评论描述
 * @returns {object} 200 - An array of comments info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", comments.update);



module.exports = router;
