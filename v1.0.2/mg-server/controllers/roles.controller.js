const db = require("../models");
const logger = require("../utils/utils.logger").logger();
const DAO = require("../dao/DAO");
const Roles = db.roles;
const Menus = db.menus;
const rolesMenus = db.rolesMenus;


//角色和菜单是多对多的
//addTags、getTags、setTags 操作中间表的方法 会自动创建
Roles.belongsToMany(Menus, {
    through: {
        model: rolesMenus,
        unique: false,
    }, foreignKey: 'roleId',
});
//addArticle、getArticle、setArticle
Menus.belongsToMany(Roles, {
    through: {
        model: rolesMenus,
        unique: false,
    }, foreignKey: 'menuIds',
});


// Create and Save a new Roles-Menus  弃用！！！！
exports.createPermission = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.menuIds) return res.sendResult({data: '', code: 605, message: "菜单IDS不能为空！"})
    // Create a Roles
    const role = {
        role_name: pm.role_name,
        role_desc: pm.role_desc,
        menuIds: pm.menuIds,
    };
    res.sendResultAto('', 200, '操作成功')

};


// Create and Save a new Roles
exports.create = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.role_name) return res.sendResult({data: '', code: 605, message: "角色名称不能为空！"})

    // Create a Roles
    const role = {
        role_name: pm.role_name,
        role_desc: pm.role_desc,
        menuIds: pm.menuIds,
    };
    await Roles.findOne({where: {'role_name': pm.role_name}}).then(singleRoles => {
        if (singleRoles && singleRoles.id) return res.sendResultAto(null, 605, '角色已存在！')
    })
    let menus = await Menus.findAll({where: {id: pm.menuIds}}) //查询所有菜单
    let newRole = await Roles.create(role)
    newRole.setMenus(menus)
    res.sendResultAto(role, 200, '创建成功')
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    pm.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
    pm.include = [
        {model: Menus,},
    ]

    DAO.list(Roles, pm, list => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single Roles with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    pm.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
    pm.include = [
        {model: Menus},
    ]
    DAO.findOne(Roles, pm, data => {
        res.sendResultAto(data.data, 200, '查询成功')
    })
};

// Update a Roles by the id in the request
exports.update = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})

    let ms = await Menus.findAll({where: {id: pm['menuIds']}})
    Roles.findByPk(pm.id).then(function (post) {
        post.update(pm)
        post.setMenus(ms) //更新中间表
        res.sendResultAto(null, 200, '修改成功')
    })
};

// Delete a Roles with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    rolesMenus.destroy({where: {roleId: pm.id}}).then(_RoleMenu => {
        DAO.delete(Roles, {id: pm.id}, data => {
            // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    }).catch(err => {
        res.sendResultAto(err, 605, '删除角色失败')
    })

};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Roles, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete Roles from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `mg_sort`'
    DAO.doQuery(sql, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
