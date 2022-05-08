const express = require('express');
const router = express.Router();
const Article = require("../../../controllers/article.controller");
const indexCon = require("../../../controllers/home.controller");

router.post("/queryNowMsgAndComments", indexCon.queryNowMsgAndComments);

/**
 * 创建博文信息
 * @route POST /api/private/article/create
 * @group 博文管理 - Operations about article
 * @param {string} article_title.query.required - 请输入博文标题
 * @param {string} article_content.query.required - 请输入博文内容
 * @param {string} article_cover - 请上传博文封面
 * @param {Boolean} isPublish - 请输入是否发布
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Article.create);

/**
 * 删除博文信息
 * @route POST /api/private/article/delete
 * @group 博文管理 - delete of Article
 * @param {number} id - 请输入博文ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Article.delete);
/**
 * 查询博文信息列表
 * @route POST /api/private/article/list
 * @group 博文管理 - list of Article
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Article.findAll);
/**
 * 更新博文信息列表
 * @route POST /api/private/article/update
 * @group 博文管理 - list of Article
 * @param {string} articlename.query.required - 请输入博文名
 * @param {string} password.query.required - 请输入密码
 * @param {string} nickName - 请输入昵称
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Article.update);

/**
 * 删除全部博文信息
 * @route POST /api/private/article/deleteAll
 * @group 博文管理 - list of Article
 * @returns {object} 200 - An array of article info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Article.deleteAll);


module.exports = router;
