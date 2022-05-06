const express = require('express');
const router = express.Router();
const Article = require("../../../../controllers/article.controller");

/**
 * 查询博文信息列表
 * @route POST /api/public/web/article/list
 * @group Client 客户端 - list of sort
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Article.findAll);

/**
 * 查询博文信息列表
 * @route POST /api/public/web/article/group
 * @group Client 客户端 - list of sort
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/group", Article.findAllGroup);
/**
 * 查询博文详情列表
 * @route POST /api/public/web/article/detail
 * @group Client 客户端 - list of sort
 * @param {string} id.query.required - 请输入博文id
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/detail", Article.findOne);

/**
 * 更新博文信息列表
 * @route POST /api/public/web/article/update
 * @group Client 客户端 - list of sort
 * @param {string} articlename.query.required - 请输入博文名
 * @param {string} password.query.required - 请输入密码
 * @param {string} nickName - 请输入昵称
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Article.update);


module.exports = router;
