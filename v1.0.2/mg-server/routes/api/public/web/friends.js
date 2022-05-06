const express = require('express');
const router = express.Router();
const Friends = require("../../../../controllers/friends.controller");


/**
 * 查询友链信息列表
 * @route POST /api/public/web/friends/list
 * @group Client 客户端 - list of sort
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of Friends info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Friends.findAll);


module.exports = router;
