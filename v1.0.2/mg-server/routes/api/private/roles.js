const express = require('express');
const router = express.Router();
const Roles = require("../../../controllers/roles.controller");

/**
 * 创建角色权限信息
 * @route POST /api/private/roles/createPermission
 * @group 角色管理 - Operations about user
 * @param {string} roleId.query.required - 请输入角色id
 * @param {string} menuIds - 请输入菜单id
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/createPermission", Roles.createPermission);
/**
 * 创建角色信息
 * @route POST /api/private/roles/create
 * @group 角色管理 - Operations about user
 * @param {string} role_name.query.required - 请输入角色名
 * @param {string} role_desc - 请输入角色名称
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/create", Roles.create);
/**
 * 删除角色信息
 * @route POST /api/private/roles/delete
 * @group 角色管理 - delete of roles
 * @param {number} id - 请输入角色ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Roles.delete);
/**
 * 查询角色信息列表
 * @route POST /api/private/roles/list
 * @group 角色管理 - list of roles
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Roles.findAll);
/**
 * 查询单个角色信息列表
 * @route POST /api/private/roles/one
 * @group 角色管理 - list of roles
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/one", Roles.findOne);
/**
 * 更新角色信息列表
 * @route POST /api/private/roles/update
 * @group 角色管理 - list of roles
 * @param {string} role_name.query.required - 请输入角色名
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Roles.update);

/**
 * 删除全部角色信息
 * @route POST /api/private/roles/deleteAll
 * @group 角色管理 - list of roles
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Roles.deleteAll);


module.exports = router;
