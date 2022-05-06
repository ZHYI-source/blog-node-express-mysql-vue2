const express = require('express');
const router = express.Router();
const Music = require("../../../../controllers/music.controller");


/**
 * 查询分类信息列表
 * @route POST /api/public/web/music/list
 * @group Client 客户端 - list of music
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of music info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Music.findAll);


module.exports = router;
