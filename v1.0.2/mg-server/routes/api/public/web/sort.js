const express = require('express');
const router = express.Router();
const Sort = require("../../../../controllers/sort.controller");


/**
 * 查询分类信息列表
 * @route POST /api/public/web/sort/list
 * @group Client 客户端 - list of sort
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of sort info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Sort.findAll);


module.exports = router;
