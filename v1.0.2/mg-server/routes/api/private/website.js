const express = require('express');
const router = express.Router();
const Website = require("../../../controllers/website.controller");

/**
 * 创建站点信息
 * @route POST /api/private/website/create
 * @group 站点管理 - Operations about website
 * @param {string} avatar.query.required - 请输入站点头像地址
 * @param {string} name.query.required - 请输入站点名称
 * @param {string} slogan.query.required - 请输入站点格言
 * @param {string} notice.query.required - 请输入站点通知
 * @param {string} domain - 请输入站点主页
 * @param {string} desc - 请输入站点描述
 * @returns {object} 200 - An array of website info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Website.create);

/**
 * 删除站点信息
 * @route POST /api/private/website/delete
 * @group 站点管理 - delete of website
 * @param {number} id - 请输入站点ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of website info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Website.delete);
/**
 * 查询站点信息列表
 * @route POST /api/private/website/list
 * @group 站点管理 - list of website
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of website info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Website.findAll);
/**
 * 更新站点信息列表
 * @route POST /api/private/website/update
 * @group 站点管理 - list of website
 * @param {string} avatar.query.required - 请输入站点头像地址
 * @param {string} name.query.required - 请输入站点名称
 * @param {string} slogan.query.required - 请输入站点格言
 * @param {string} notice.query.required - 请输入站点通知
 * @param {string} domain - 请输入站点主页
 * @param {string} desc - 请输入站点描述
 * @returns {object} 200 - An array of website info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Website.update);


module.exports = router;
