const express = require('express');
const router = express.Router();
const About = require("../../../../controllers/about.controller");


/**
 * 查询关于博主信息列表
 * @route POST /api/public/web/about/list
 * @group Client 客户端 - list of sort
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of Friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", About.findAll);


module.exports = router;
