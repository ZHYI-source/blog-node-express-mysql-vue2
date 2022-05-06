const express = require('express');
const router = express.Router();
const Socials = require("../../../../controllers/socials.controller");


/**
 * 查询社交信息列表
 * @route POST /api/public/web/socials/list
 * @group Client 客户端 - list of socials
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of Friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Socials.findAll);


module.exports = router;
