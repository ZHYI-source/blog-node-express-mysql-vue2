const express = require('express');
const router = express.Router();
const About = require("../../../controllers/about.controller");

/**
 * 创建关于博主信息
 * @route POST /api/private/about/create
 * @group 关于博主管理 - Operations about about
 * @param {string} about_content - 请输入关于博主内容
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", About.create);

/**
 * 删除关于博主信息
 * @route POST /api/private/about/delete
 * @group 关于博主管理 - delete of about
 * @param {number} id - 请输入关于博主ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", About.delete);
/**
 * 查询关于博主信息列表
 * @route POST /api/private/about/list
 * @group 关于博主管理 - list of about
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", About.findAll);
/**
 * 更新关于博主信息列表
 * @route POST /api/private/about/update
 * @group 关于博主管理 - list of about
 * @param {string} about_content - 请输入关于博主内容
 * @returns {object} 200 - An array of about info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", About.update);


module.exports = router;
