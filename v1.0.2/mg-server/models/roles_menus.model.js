//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//标签
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rolesMenus",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            roleId: {
                type: Sequelize.STRING,
                notNull: true,
                allowNull:false,
                comment: '角色ID',
            },
            menuIds: {
                type: Sequelize.STRING,
                comment: '菜单ID',
                allowNull:false,
            },
        }, {
            tableName: 'mg_roles_menus'
        });
};
