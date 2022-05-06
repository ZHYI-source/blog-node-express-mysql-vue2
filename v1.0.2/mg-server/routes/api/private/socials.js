const express = require('express');
const router = express.Router();
const Socials = require("../../../controllers/socials.controller");

/**
 * 创建社交信息
 * @route POST /api/private/socials/create
 * @group 社交管理 - Operations about socials
 * @param {string} icon.query.required - 请输入社交图标
 * @param {string} color.query.required - 请输入社交图标颜色
 * @param {string} href - 请输入社交链接
 * @param {string} text - 请输入社交文字说明
 * @param {string} img - 请输入社交图片地址
 * @returns {object} 200 - An array of socials info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Socials.create);

/**
 * 删除社交信息
 * @route POST /api/private/socials/delete
 * @group 社交管理 - delete of socials
 * @param {number} id - 请输入社交ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of socials info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Socials.delete);
/**
 * 查询社交信息列表
 * @route POST /api/private/socials/list
 * @group 社交管理 - list of socials
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of socials info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Socials.findAll);
/**
 * 更新社交信息列表
 * @route POST /api/private/socials/update
 * @group 社交管理 - list of socials
 * @param {string} icon.query.required - 请输入社交图标
 * @param {string} color.query.required - 请输入社交图标颜色
 * @param {string} href - 请输入社交链接
 * @param {string} text - 请输入社交文字说明
 * @param {string} img - 请输入社交图片地址
 * @returns {object} 200 - An array of socials info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Socials.update);


module.exports = router;
