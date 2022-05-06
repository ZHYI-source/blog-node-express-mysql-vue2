const express = require('express');
const router = express.Router();
const CodeGeneration = require("../../../controllers/code.generation.controller");

/**
 * 创建关于代码生成
 * @route POST /api/private/about/create
 * @group 关于代码生成管理 - Operations about about
 * @param {string} about_content - 请输入关于代码生成内容
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", CodeGeneration.create);

/**
 * 删除关于代码生成
 * @route POST /api/private/about/delete
 * @group 关于代码生成管理 - delete of about
 * @param {number} id - 请输入关于代码生成ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", CodeGeneration.delete);
/**
 * 查询关于代码生成列表
 * @route POST /api/private/about/list
 * @group 关于代码生成管理 - list of about
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", CodeGeneration.findAll);
/**
 * 查询关于代码生成列表
 * @route POST /api/private/about/list
 * @group 关于代码生成管理 - list of about
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/one", CodeGeneration.findOne);
/**
 * 更新关于代码生成列表
 * @route POST /api/private/about/update
 * @group 关于代码生成管理 - list of about
 * @param {string} about_content - 请输入关于代码生成内容
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", CodeGeneration.update);


module.exports = router;
