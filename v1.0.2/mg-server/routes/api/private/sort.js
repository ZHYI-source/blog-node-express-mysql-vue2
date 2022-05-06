const express = require('express');
const router = express.Router();
const Sort = require("../../../controllers/sort.controller");

/**
 * 创建分类信息
 * @route POST /api/private/sort/create
 * @group 分类管理 - Operations about sort
 * @param {string} sort_name.query.required - 请输入分类名称
 * @param {string} sort_desc.query.required - 请输入分类描述
 * @param {string} sort_path - 请输入分类路径
 * @returns {object} 200 - An array of sort info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Sort.create);

/**
 * 删除分类信息
 * @route POST /api/private/sort/delete
 * @group 分类管理 - delete of sort
 * @param {number} id - 请输入分类ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of sort info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Sort.delete);
/**
 * 查询分类信息列表
 * @route POST /api/private/sort/list
 * @group 分类管理 - list of sort
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of sort info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Sort.findAll);
/**
 * 更新分类信息列表
 * @route POST /api/private/sort/update
 * @group 分类管理 - list of sort
 * @param {string} sort_name.query.required - 请输入分类名称
 * @param {string} sort_desc.query.required - 请输入分类描述
 * @returns {object} 200 - An array of sort info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Sort.update);

/**
 * 删除全部分类信息
 * @route POST /api/private/sort/deleteAll
 * @group 分类管理 - list of sort
 * @returns {object} 200 - An array of sort info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Sort.deleteAll);


module.exports = router;
