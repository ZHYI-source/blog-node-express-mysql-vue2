const express = require('express');
const router = express.Router();
const Musics = require("../../../controllers/music.controller");

/**
 * 创建音乐信息
 * @route POST /api/private/music/create
 * @group 音乐管理 - Operations about music
 * @param {string} name.query.required - 请输入音乐名称
 * @param {string} author.query.required - 请输入音乐作者
 * @param {string} url - 请输入音乐地址
 * @param {string} cover - 请输入音乐封面路径
 * @param {string} lrc - 请输入音乐歌词
 * @returns {object} 200 - An array of music info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/create", Musics.create);

/**
 * 删除音乐信息
 * @route POST /api/private/music/delete
 * @group 音乐管理 - delete of music
 * @param {number} id - 请输入音乐ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of music info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Musics.delete);

/**
 * 查询音乐信息列表
 * @route POST /api/private/music/list
 * @group 音乐管理 - list of music
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of music info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Musics.findAll);

/**
 * 更新音乐信息列表
 * @route POST /api/private/music/update
 * @group 音乐管理 - list of music
 * @param {string} name.query.required - 请输入音乐名称
 * @param {string} author.query.required - 请输入音乐作者
 * @param {string} url - 请输入音乐地址
 * @param {string} cover - 请输入音乐封面路径
 * @param {string} lrc - 请输入音乐歌词
 * @returns {object} 200 - An array of music info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Musics.update);

module.exports = router;
