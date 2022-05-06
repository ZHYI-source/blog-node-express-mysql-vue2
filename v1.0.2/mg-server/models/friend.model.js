//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//友链
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("friend",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            path: {
                type: Sequelize.STRING,
                notNull: true,
                notEmpty: true,
                comment: '友链地址',
            },
            siteName: {
                type: Sequelize.STRING,
                comment: '友链站点',
            },
            email: {
                type: Sequelize.STRING,
                comment: '友链邮箱',
            },
            desc: {
                type: Sequelize.TEXT("long"),
                comment: '友链描述',
            },
        }, {
            tableName: 'mg_friends'
        });
};
