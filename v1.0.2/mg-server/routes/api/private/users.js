const express = require('express');
const router = express.Router();
const Users = require("../../../controllers/users.controller");

/**
 * 创建用户信息
 * @route POST /api/private/users/create
 * @group 用户管理 - Operations about user
 * @param {string} username.query.required - 请输入用户名
 * @param {string} password.query.required - 请输入密码
 * @param {string} nickName - 请输入昵称
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/create", Users.create);
/**
 * 删除用户信息
 * @route POST /api/private/users/delete
 * @group 用户管理 - delete of users
 * @param {number} id - 请输入用户ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Users.delete);
/**
 * 查询用户信息列表
 * @route POST /api/private/users/list
 * @group 用户管理 - list of users
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Users.findAll);
/**
 * 更新用户信息列表
 * @route POST /api/private/users/update
 * @group 用户管理 - list of users
 * @param {string} username.query.required - 请输入用户名
 * @param {string} password.query.required - 请输入密码
 * @param {string} nickName - 请输入昵称
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Users.update);

/**
 * 删除全部用户信息
 * @route POST /api/private/users/deleteAll
 * @group 用户管理 - list of users
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Users.deleteAll);


module.exports = router;
