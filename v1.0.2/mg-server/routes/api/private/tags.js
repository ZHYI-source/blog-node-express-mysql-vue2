const express = require('express');
const router = express.Router();
const Tags = require("../../../controllers/tags.controller");

/**
 * 创建标签信息
 * @route POST /api/private/tags/create
 * @group 标签管理 - Operations about tags
 * @param {string} tag_name.query.required - 请输入标签名称
 * @param {string} tag_desc.query.required - 请输入标签描述
 * @returns {object} 200 - An array of tags info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Tags.create);

/**
 * 删除标签信息
 * @route POST /api/private/tags/delete
 * @group 标签管理 - delete of tags
 * @param {number} id - 请输入标签ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of tags info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Tags.delete);
/**
 * 查询标签信息列表
 * @route POST /api/private/tags/list
 * @group 标签管理 - list of tags
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of tags info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Tags.findAll);
/**
 * 更新标签信息列表
 * @route POST /api/private/tags/update
 * @group 标签管理 - list of tags
 * @param {string} tag_name.query.required - 请输入标签名称
 * @param {string} tag_desc.query.required - 请输入标签描述
 * @returns {object} 200 - An array of tags info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Tags.update);

/**
 * 删除全部标签信息
 * @route POST /api/private/tags/deleteAll
 * @group 标签管理 - list of tags
 * @returns {object} 200 - An array of tags info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Tags.deleteAll);


module.exports = router;
