//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//标签
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("roles",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            role_name: {
                type: Sequelize.STRING,
                notNull: true,
                notEmpty: true,
                comment: '角色名称',
            },
            role_desc: {
                type: Sequelize.STRING,
                comment: '角色描述',
            },
        }, {
            tableName: 'mg_roles'
        });
};
