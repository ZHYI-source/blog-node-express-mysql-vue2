const express = require('express');
const router = express.Router();
const Menus = require("../../../controllers/menus.controller");

/**
 * 创建菜单信息
 * @route POST /api/private/menus/create
 * @group 菜单管理 - Operations about menu
 * @param {string} title.query.required - 请输入菜单名
 * @param {string} path.query.required - 请输入菜单路径
 * @param {string} pid.query.required - 请输入菜单父级ID
 * @param {string} icon - 请输入菜单图标
 * @returns {object} 200 - An array of menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/create", Menus.create);
/**
 * 删除菜单信息
 * @route POST /api/private/menus/delete
 * @group 菜单管理 - delete of menus
 * @param {number} id - 请输入菜单ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Menus.delete);
/**
 * 查询菜单信息列表
 * @route POST /api/private/menus/list
 * @group 菜单管理 - list of menus
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Menus.findAll);
/**
 * 更新菜单信息列表
 * @route POST /api/private/menus/update
 * @group 菜单管理 - list of menus
 * @param {string} id.query.required - 请输入菜单ID
 * @returns {object} 200 - An array of menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Menus.update);

/**
 * 删除全部菜单信息
 * @route POST /api/private/menus/deleteAll
 * @group 菜单管理 - list of menus
 * @returns {object} 200 - An array of menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Menus.deleteAll);


module.exports = router;
